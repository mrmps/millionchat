import * as marked from 'marked'

const markdown = `# Rizzsearch Terms of Use

Effective: January 31, 2024

## Key Terms and Conditions
- **Minimum Age and Registration:** Users must be at least 13 years old or the minimum age required in their country. Accurate and complete information is required for account registration. Users must not share their account credentials and are responsible for activities under their account.
- **Usage Restrictions:** Users must comply with all applicable laws and OpenAI policies. Prohibited activities include using the services for illegal, harmful, or abusive activities, infringing on rights, modifying or distributing any part of the services, reverse engineering, and circumventing any rate limits or protective measures. Importantly, users must not use the services in ways that could cause a Distributed Denial of Service (DDoS) or similar attacks.

## Content and Intellectual Property
- **Content Responsibility:** Users are responsible for the content they input and receive from OpenAI services. While users retain ownership of their input and the output they receive, they must ensure it does not violate laws or these terms.
- ** Rights of Rizzsearch:** OpenAI owns all rights, title, and interest in the Services. The use of the name and logo of Rizzsearch must be in accordance with the brand guidelines.

## Legal Provisions
- **Disclaimer and Limitation of Liability:** Services are provided AS IS, and OpenAI disclaims all warranties. The liability of Rizzsearch is limited to the greater of the amount paid for the service and $0. 
- **Governing Law and Dispute Resolution:** California law governs these Terms. Disputes are to be resolved through mandatory arbitration, with specific exceptions for small claims court and equitable relief for unauthorized use or abuse of services.
- **General Terms:** These Terms constitute the entire agreement between the user and OpenAI. They are subject to change, and users are advised to review them periodically.`

export default function Terms() {
  const markdownHTML = marked.parse(markdown)
  return (
    // <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10 ">
    <>
      <article className="prose lg:prose-xl mx-auto my-40">
        <div dangerouslySetInnerHTML={{ __html: markdownHTML }} />
      </article>
    </>
  )
}
