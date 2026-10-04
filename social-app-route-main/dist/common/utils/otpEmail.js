"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpEmail = otpEmail;
function otpEmail(otp) {
    const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">

            <table width="600" cellpadding="0" cellspacing="0"
                   style="background:#ffffff;border-radius:12px;padding:40px;">

                <tr>
                    <td align="center">
                        <h1 style="margin:0;color:#222;">
                            Verify Your Account
                        </h1>
                    </td>
                </tr>

                <tr>
                    <td align="center" style="padding-top:20px;">
                        <p style="color:#666;">
                            Use the verification code below:
                        </p>
                    </td>
                </tr>

                <tr>
                    <td align="center" style="padding:25px 0;">
                        <div style="
                    display:inline-block;
                    padding:15px 30px;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    background:#f4f4f4;
                    border-radius:8px;
                    color:#222;
                  ">
                            ${otp}
                        </div>
                    </td>
                </tr>

                <tr>
                    <td align="center">
                        <p style="color:#888;font-size:14px;">
                            This code expires in 30 minutes.
                        </p>
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>
</body>
</html>
`;
    return html;
}
