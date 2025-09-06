# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your Gmail account (zini.m.amine@gmail.com)
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact Form Message - {{subject}}

**Email Body:**
```
Hello Mohamed,

You have received a new message from your portfolio contact form:

From: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website contact form.
Reply directly to this email to respond to {{user_name}}.
```

4. Set the template settings:
   - From Name: {{user_name}}
   - From Email: {{user_email}}
   - To Email: zini.m.amine@gmail.com
   - Reply To: {{user_email}}

5. Save and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

## Step 5: Update Contact Component
Replace the placeholder values in `src/components/Contact_new.jsx`:

```javascript
emailjs.sendForm(
  'YOUR_SERVICE_ID',    // Replace with your Service ID from Step 2
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID from Step 3
  form.current,
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key from Step 4
)
```

## Step 6: Test the Form
1. ✅ **COMPLETED** - Contact component is now active in App.jsx
2. Test the form to make sure emails are being sent
3. Check your spam folder if you don't see the test emails

## Step 7: Update App.jsx 
✅ **COMPLETED** - App.jsx now uses the Contact component from Contact_new.jsx

## Notes:
- Free EmailJS plan allows 200 emails per month
- Emails will appear to come from the form filler's email address
- You can reply directly to these emails
- All form data is included in the email
- Form includes validation and loading states
