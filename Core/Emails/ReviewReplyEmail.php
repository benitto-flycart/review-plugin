<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\ReplyRequest;
use Flycart\Review\Core\Models\NotificationHistory;
use WC_Email;

class ReviewReplyEmail extends WC_Email
{
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public ReplyRequest $replyRequest;
    public \WC_Product $product;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'review_reply_email';
        $this->title = __('Review Reply Email', 'flycart-review');
        $this->description = __('An Email Send to Reply Email', 'flycart-review');
        $this->heading = __("[{site_title}] Reply Email", 'flycart-review');

        $this->subject = __("[{site_title}] - Reply Email", 'flycart-review');

        // Template paths.
        $this->template_html = 'review-reply.php';
        $this->customer_email = true;

        $this->template_plain = 'plain/review-reply.php';

        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {
        $notification_id = $data['notification_id'] ?? '';
        $reply_comment_id = $data['reply_comment_id'] ?? '';

        $reply_comment = get_comment($reply_comment_id);
        $parent_comment = get_comment($reply_comment->comment_parent);

        $product_id = $parent_comment->comment_post_ID;

        $comment_author_email =  $parent_comment->comment_author_email;

        $this->product = wc_get_product($product_id);

        if (!$this->product instanceof \WC_Product) {
            error_log('product not found');
            return false;
        }

        $notification = NotificationHistory::query()->find($notification_id);

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $this->brandSettings = (new BrandSettings);
        $this->generalSettings = (new GeneralSettings);
        $this->replyRequest = new ReplyRequest(get_locale());

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $html = $this->get_content();

        $short_codes = [
            '{email}' => $comment_author_email,
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{customer_name}' => '',
            '{body}' => $this->replyRequest->getBody(),
            '{reply_contet}' => $reply_comment->comment_content,
            '{footer_text}' => $this->generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_reply_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        $this->send($comment_author_email, $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());

        NotificationHistory::query()->update([
            'notification_content' => $html,
            'status' => NotificationHistory::SUCCESS,
        ], [
            'id' => $notification_id
        ]);
    }

    public function get_content_html()
    {
        return $this->get_content_string();
    }

    public function get_content_plain()
    {
        return $this->get_content_string(true);
    }

    public function get_content_string($plain_text = false)
    {
        return wc_get_template_html($this->template_plain, array(
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $this->brandSettings,
            'generalSettings' => $this->generalSettings,
            'reviewReply' => $this->replyRequest
        ), '', $this->template_base);
    }
}
