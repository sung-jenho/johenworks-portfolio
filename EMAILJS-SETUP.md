# EmailJS Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's FREE!)
3. Sign up with your email or Google account

### Step 2: Add Email Service
1. After login, go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Click "Connect Account" and authorize
5. Copy the **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact from Portfolio - {{from_name}}

**Content:**
```
You have a new message from your portfolio!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from johenworks.com
```

4. Save template and copy the **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find "Public Key" section
3. Copy your **Public Key** (looks like: `abc123XYZ`)

### Step 5: Update Your Code
Open `form-handler.js` and replace these lines (around line 12-16):

```javascript
this.emailJSConfig = {
  serviceID: 'YOUR_SERVICE_ID',      // Replace with your Service ID
  templateID: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your Public Key
};
```

### Example:
```javascript
this.emailJSConfig = {
  serviceID: 'service_abc123',
  templateID: 'template_xyz789',
  publicKey: 'abc123XYZ'
};
```

## That's It! 🎉

Your contact form will now:
- ✅ Send emails to your inbox
- ✅ Validate inputs in real-time
- ✅ Show success/error messages
- ✅ Display loading state

## Testing
1. Fill out your contact form
2. Click "Send Message"
3. Check your email inbox!

## Free Tier Limits
- 200 emails/month (plenty for a portfolio)
- No credit card required
- Perfect for personal portfolios

## Troubleshooting
If emails aren't sending:
1. Check browser console for errors
2. Verify all IDs are correct
3. Make sure email service is connected
4. Check EmailJS dashboard for delivery status

---

**Note:** The form works even without EmailJS setup - it will show a success message and log the data to console for testing.
