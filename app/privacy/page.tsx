import * as marked from 'marked'

const markdown = ` # Rizzsearch Privacy Policy

This SERVICE is provided by Rizzsearch at no cost and is intended for use as is. This page is used to inform visitors regarding policies with the collection, use, and disclosure of Personal Information for those who decide to use the Service.

## Agreement

By using this Service, you agree to the collection and use of information in relation to this policy. The Personal Information we collect is used for providing and improving the Service. We will not use or share your information except as described in this Privacy Policy. 

## Terms and Conditions

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at [AI Emojis](#), unless otherwise defined in this Privacy Policy.

### 1. Information Collection and Use

For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information requested will be retained on your device and is not collected by us in any way. 

**Third-party Services:**
The app uses third-party services that may collect information used to identify you.

*Link to the privacy policy of third-party service providers used by the app: Vercel Deployment and Analytics*

### 2. Log Data

In case of an error in the app, we collect data and information on your phone through third-party products. This Log Data may include information such as your device &aposs IP address, device name, operating system version, app configuration when using our Service, the time and date of your use, and other statistics.

### 3. Cookies

Cookies are files with small amounts of data used as anonymous unique identifiers. These are sent to your browser from the websites you visit and are stored on your device &aposs internal memory. 

**Note:**
- This Service does not use &apos;cookies&apos; explicitly.
- The app may use third-party code and libraries that use &apos;cookies&apos; to collect information and improve their services.
- You have the option to accept or refuse these cookies and know when a cookie is being sent to your device. If you refuse our cookies, some portions of this Service may not be usable.

### 4. Service Providers

We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your Personal Information, but are obligated not to disclose or use it for any other purpose.

### 5. Security

We strive to use commercially acceptable means of protecting your Personal Information, but remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and absolute security cannot be guaranteed.

### 6. Links to Other Sites

This Service may contain links to other sites. Note that these external sites are not operated by us. We advise you to review the Privacy Policy of these websites, as we have no control over and assume no responsibility for their content, privacy policies, or practices.

### 7. Children’s Privacy

We do not knowingly collect personally identifiable information from children. We encourage parents and guardians to monitor their children &aposs Internet usage and to enforce this Policy by instructing their children never to provide personally identifiable information through the Application and/or Services without their permission.

**Age Requirement:**
You must be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries we may allow your parent or guardian to do so on your behalf).

### 8. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 2023-10-10.

### 9. Contact Us

If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at [contact@rizzsearch.com](mailto:contact@rizzsearch.com).`

export default function Terms() {
  const markdownHTML = marked.parse(markdown)
  return (
    <>
      <article className="prose lg:prose-xl mx-auto my-40">
        <div className="text-lg font-bold">Privacy Policy</div>
        <div dangerouslySetInnerHTML={{ __html: markdownHTML }} />
       

      </article>
    </>
  )
}
