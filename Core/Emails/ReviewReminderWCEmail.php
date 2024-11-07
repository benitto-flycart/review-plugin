<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\Order;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\ReviewReminderEmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use WC_Email;
use WC_Order;

class ReviewReminderWCEmail extends WC_Email
{
    public WC_Order $woo_order;
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public  ReviewReminderEmailSetting $reviewReminder;
    public  array $notReviewedLineItems;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'review_remainder_email';
        $this->title = __('Review Remainder Email', 'flycart-review');
        $this->description = __('An Email Send to reminder review', 'flycart-review');
        $this->heading = __("[{site_title}] Add Review!", 'flycart-review');

        $this->subject = __("[{site_title}] - Add Reminder Email", 'flycart-review');

        // Template paths.
        $this->template_html = 'review-reminder.php';
        $this->customer_email = true;

        $this->template_plain = 'plain/review-reminder.php';

        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {

        $notification_id = $data['notification_id'] ?? '';

        $notification = NotificationHistory::query()->find($notification_id);

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $order_id = $notification->order_id;

        $this->woo_order = wc_get_order($notification->model_id);

        $prduct_ids = Order::getProductIds($this->woo_order);

        $args = array(
            'meta_query' => array(
                array(
                    'key'     => '_review_order_id',   // Replace with your meta key
                    'value'   => $order_id, // Replace with your meta value
                    'compare' => '=',               // Comparison operator (default is '=')
                ),
            ),
        );

        // Retrieve comments based on the meta query
        $comments = get_comments($args);

        $reviewed_product_ids = array_map(function ($comment) {
            return $comment->comment_post_ID;
        }, $comments);


        $not_reviewed_product_ids = array_diff($prduct_ids, $reviewed_product_ids);

        if (empty($not_reviewed_product_ids)) {
            return;
        }

        $this->notReviewedLineItems =  Order::filterItems($this->woo_order, $not_reviewed_product_ids);
        //If any of the line item has no review then send the reminder with only the products which has no review

        $this->brandSettings = (new BrandSettings);
        $this->generalSettings = (new GeneralSettings);

        $this->reviewReminder =  new ReviewReminderEmailSetting(get_locale());


        $html = $this->get_content();

        $short_codes = [
            '{email}' => $customer_billing_email = $this->woo_order->get_billing_email(),
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{body}' => $this->reviewReminder->replaceCustomeEmailPlaceholders($this->reviewReminder->getBody(), $this->woo_order),
            '{button_text}' => $this->reviewReminder->replaceCustomeEmailPlaceholders($this->reviewReminder->getButtonText(), $this->woo_order),
            '{footer_text}' => $this->reviewReminder->replaceCustomeEmailPlaceholders($this->generalSettings->getFooterText(), $this->woo_order),
            '{unsubscribe_link}' =>  'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_reminder_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        $this->send($customer_billing_email, $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());

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
            'order' => $this->woo_order,
            'order_items' => $this->getNotReviewedLineItems(),
            'data' => [
                'styles' => $this->reviewReminder->getDefaultStyles($this->brandSettings),
            ]
        ), '', $this->template_base);
    }

    public function getNotReviewedLineItems()
    {
        return $this->notReviewedLineItems;
    }
}
