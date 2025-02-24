<?php
defined('ABSPATH') || exit;
?>

<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>
    </title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php echo apply_filters('farp_prefix_get_google_font_link_for_email_template', ''); ?>
    <style type="text/css">
        <?php $fontStyles = apply_filters('farp_prefix_get_desired_font_style', []); ?>#outlook a {
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
        .mj-outlook-group-fix {
            width: 100% !important;
        }
    </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }

            mj-column-per-25 width: 25% !important;
            max-width: 25%;
        }
        }
    </style>
    <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }

        .moz-text-html .mj-column-per-25 {
            width: 25% !important;
            max-width: 25%;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width: 480px) {
            table.mj-full-width-mobile {
                width: 100% !important;
            }

            td.mj-full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body style="word-spacing:normal;">
    <div class="<?php echo isset($fontStyles['class']) ? esc_attr($fontStyles['class']) : ''; ?>" style="padding-bottom:10px;background-color:<?php echo esc_attr($data['styles']['email_bg_color']); ?>; color:<?php echo esc_attr($data['styles']['email_text_color']); ?>; <?php echo isset($fontStyles['content']) ? esc_attr($fontStyles['content']) : ''; ?>">
        <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
        <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                            <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr></tr>
                    </table>
                    <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->

        <?php if ($brandSettings->isLogoEnabled()) { ?>
            <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
            <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
            <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px;text-align:center;">
                                <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align:top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size:0px;word-break:break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style="border-collapse:collapse;border-spacing:0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:100%;">
                                                                    <img height="auto"
                                                                        src="{logo_src}"
                                                                        style="border:0;outline:none;text-decoration:none;height:50px;font-size:13px;"
                                                                        alt="">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
        </td>
        </tr>
        </table><![endif]-->
        <?php } ?>

        <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;background-color:<?php echo $brandSettings->getContentBgColor() ?>" width="600">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <?php if ($brandSettings->isEmailBannerEnabled()) { ?>
            <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class=""
           style="width:600px; background-color: <?php echo $brandSettings->getContentBgColor() ?>;" width="600">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
            <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%; background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:100%;">
                                                                    <img height="auto"
                                                                        src="{logo_src}"
                                                                        style="text-decoration:none;width:100%;min-height:100px;max-height:200px;font-size:13px;"
                                                                        alt="">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!--[if mso | IE]></td>
                    </tr>
                    </table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]--
    <?php } ?>

<!--[if mso | IE]
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;"
        width="600">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;">
                    <![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align:top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word;">
                                                    <div style="font-size:14px;line-height:28px;text-align:left;">
                                                        {body}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td>
                    </tr>
                    </table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->


            <?php foreach ($order->get_items() as $line_item) { ?>
                <?php
                $product_id = $line_item['product_id'];
                $product = wc_get_product($product_id);
                $reviewLink = \Flycart\Review\App\Helpers\PluginHelper::getReviewLink($order, $product_id);
                $image_url = \Flycart\Review\App\Helpers\Product::getProductImageForEmail($product);
                ?>
                <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;"width="600">
    <tr bgcolor="<?php echo esc_attr($data['styles']['email_bg_color']); ?>">
    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
   <![endif]-->
                <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;text-align:center;">
                                    <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                        <![endif]-->
                                    <!--[if mso | IE]>
                        <td class="" style="vertical-align:top;width:600px;">
                        <![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center"
                                                        style="font-size:0px;padding:10px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            role="presentation"
                                                            style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:128px;">
                                                                        <img height="auto"
                                                                            alt="Image"
                                                                            src="<?php echo $image_url ?>"
                                                                            style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td><![endif]-->

                                    <!--[if mso | IE]>
                        <td class="" style="vertical-align:top;width:150px;">
                        <![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                        style="font-size:0px;width:100%;text-align:center;direction:ltr;display:inline-block;vertical-align:top;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center"
                                                        style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                        <div style="font-size:13px;line-height:1;text-align:center;">
                                                            <?php echo $line_item->get_name() ?>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" vertical-align="middle"
                                                        style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            role="presentation"
                                                            style="border-collapse:separate;line-height:100%;">
                                                            <tr>
                                                                <td align="center"
                                                                    role="presentation"
                                                                    style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;"
                                                                    valign="middle">
                                                                    <a href="<?php echo $reviewLink ?>"
                                                                        style="display:inline-block;background-color:<?php echo esc_attr($data['styles']['button_bg_color']); ?>;
                                                                               color:<?php echo esc_attr($data['styles']['button_text_color']) ?>;
                                                                               font-size:13px;line-height:120%;margin:0;text-decoration:none;
                                                                               text-transform:none;padding:10px;mso-padding-alt:0px;border-radius:3px;
                                                                               border:3px solid <?php echo esc_attr($data['styles']['button_border_color']) ?>;
                                                                               text-align:center;"
                                                                        target="_blank">
                                                                        {button_text}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                        </td>
                        <![endif]-->
                                    <!--[if mso | IE]>
                        </tr>
                        </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
        </td>
        </tr>
        </table>
        <![endif]-->
            <?php } ?>

            <!--[if mso | IE]>
<?php if ($generalSettings->isFooterEnabled()): ?>
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;"
           width="600">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->
            <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;">
                    <![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align:top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center"
                                                    style="font-size:0px;word-break:break-word;">
                                                    <div style="padding-bottom:10px;font-size:13px;line-height:1;text-align:center;">
                                                        {footer_text}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="font-size:0px;word-break:break-word;">
                                                    <div style="font-size:10px;line-height:1;text-align:center;">
                                                        <a href="{unsubscribe_link}">Unsubscribe</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td>
                    </tr>
                    </table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
</td>
</tr>
</table>
<![endif]-->
        <?php endif ?>


    </div>
</body>

</html>
