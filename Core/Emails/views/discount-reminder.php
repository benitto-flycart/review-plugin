<?php
defined('ABSPATH') || exit;
?>

<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title></title><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
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
    <![endif]--><!--[if lte mso 11]>
    <style type="text/css">
        .mj-outlook-group-fix {
            width: 100% !important;
        }
    </style>
    <![endif]-->
    <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }

            .mj-column-per-70 {
                width: 70% !important;
                max-width: 70%;
            }
        }
    </style>
    <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }

        .moz-text-html .mj-column-per-70 {
            width: 70% !important;
            max-width: 70%;
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
    <div class="<?php echo isset($fontStyles['class']) ? esc_attr($fontStyles['class']) : ''; ?>" style="padding-bottom:10px;background-color:<?php echo esc_attr($data['styles']['email_bg_color']); ?>; color:<?php echo esc_attr($data['styles']['email_text_color']); ?>; <?php echo isset($fontStyles['content']) ? esc_attr($fontStyles['content']) : ''; ?>"><!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
           >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <?php if ($brandSettings->isLogoEnabled()): ?>
            <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="font-size:0px;text-align:center;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align:top;padding:20px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
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
            <!--[if mso | IE]></td></tr></table>

        <?php endif; ?>
        <!--[if mso | IE]></td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
           >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <?php if ($brandSettings->isEmailBannerEnabled()): ?>
                <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;padding-top:4px;text-align:center;">
                                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:592px;"><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                            style="border-collapse:collapse;border-spacing:0px;width:100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:100%;">
                                                                        <img height="auto"
                                                                            src="{logo_src}"
                                                                            style="border:0;display:block;outline:none;width:100%;min-height:100px;max-height:200px;text-decoration:none;font-size:13px;"
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
            <?php endif; ?>
            <!--[if mso | IE]></td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
           >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class=""
                                       style= "" >
                                    <tr>
                                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                                <div style="margin:0px auto;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="width:100%;">
                                        <tbody>
                                            <tr>
                                                <td style="direction:ltr;font-size:0px;padding-bottom:0px;text-align:center;">
                                                    <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr></tr>
                                    </table><![endif]-->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table></td>
                <td class="" style="">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:NaNpx;"
                           >
                        <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                                <div style="margin:0px auto;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="width:100%;">
                                        <tbody>
                                            <tr>
                                                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                                    <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="" style="vertical-align:top;"><![endif]-->
                                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                            width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:top;padding:25px;padding-top:25px;padding-right:25px;padding-bottom:25px;padding-left:25px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left"
                                                                                        style="font-size:0px;padding:10px 25px;padding-right:20px;word-break:break-word;">
                                                                                        <div style="font-size:16px;line-height:1.5;text-align:left;">
                                                                                            {body}
                                                                                        </div>
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
                                <td class="" style="vertical-align:top;"><![endif]-->
                                                    <div class="mj-column-per-70 mj-outlook-group-fix"
                                                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                            width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:top;padding:18px;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center"
                                                                                        style="word-break:break-word;">
                                                                                        <div style="font-size:39px;border:0.5px solid #ffffff;border-radius: 10px;font-style:normal;line-height:1.5;text-align:center;">
                                                                                            {discount_code}<span style="font-size:14px;"><br></span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center"
                                                                                        style="font-size:0px;padding:2px;padding-top:6px;padding-right:2px;padding-bottom:2px;padding-left:2px;word-break:break-word;">
                                                                                        <div style="font-size:13px;font-style:normal;line-height:1.5;text-align:center;">
                                                                                            Discount expires :{discount_expires}
                                                                                        </div>
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
                                <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
           >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix"
                                    style="text-align:center;direction:ltr;display:inline-block;vertical-align:top;width:100%;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align:top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" vertical-align="middle"
                                                    style="font-size:0px;padding:0px 25px 10px 25px;word-break:break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style="border-collapse:separate;line-height:100%;">
                                                        <tr>
                                                            <td align="center" role="presentation"
                                                                style="border:3px solid <?php echo esc_attr($data['styles']['button_border_color']); ?>;border-radius:3px;cursor:auto;mso-padding-alt:10px 50px;"
                                                                valign="middle">
                                                                <a <a href="{review_link}" style="display:inline-block;background-color:<?php echo esc_attr($data['styles']['button_bg_color']); ?>;color:<?php echo esc_attr($data['styles']['button_text_color']); ?>;font-size:14px;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px;mso-padding-alt:0px;">
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
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
           >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <?php if ($generalSettings->isFooterEnabled()): ?><div style="margin:0px auto;max-width:600px;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                        style="font-size:0px;text-align:center;direction:ltr;display:inline-block;vertical-align:top;width:100%;background-color: <?php echo esc_attr($data['styles']['email_content_bg_color']); ?>;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <!--                                            <tr>-->
                                                <!--                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">-->
                                                <!--                                                    <p-->
                                                <!--                                                        style="border-top:solid 2px ;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px ;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;-->
                                                <!--</td></tr></table><![endif]-->-->
                                                <!--                                                </td>-->
                                                <!--                                            </tr>-->
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                        <div style="font-size:14px;text-align:center;">
                                                            {footer_text}<br><br>
                                                            <a
                                                                data-cke-saved-href="http://localhost:7000" href="http://localhost:7000"
                                                                style="">Unsubscribe</a><br>
                                                        </div>
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
                </div><?php endif; ?>
            <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
</body>

</html>
