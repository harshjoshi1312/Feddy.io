import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  otp,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <h1>your otp, {otp}!</h1>
  </div>
);
