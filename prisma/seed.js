const { PrismaClient } = require('@prisma/client');
const { ObjectId } = require('mongodb');
const prisma = new PrismaClient();

async function main() {
  // Helper function to generate 12-byte ObjectId
  const generateObjectId = () => new ObjectId().toString();

const agentData = [
  {
      "id": generateObjectId(),
      "createdAt": "2025-01-21T00:49:59.328Z",
      "userId": generateObjectId(),
      "title": "GLooM AI",
      "slug": "gloom-ai-4omd",
      "subtitle": null,
      "description": "Ask anything about $GLooM and Solana",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "a1zc2dd07hhwbhy1o7deg",
      "updatedAt": "2025-01-21T01:06:01.588Z",
      "username": "GLooM Coin",
      "socialLinks": {
        "reddit": "",
        "twitter": "gloomonsol",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-a1zc2dd07hhwbhy1o7deg-826294280.png",
      "category": "web-3",
      "countMessages": 419
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-12-13T11:31:27.706Z",
      "userId": generateObjectId(),
      "title": "Bible Chat",
      "slug": "bible-chat-ffcw",
      "subtitle": null,
      "description": "Discover our Christian Chat, powered by the latest AI technology. A place to deepen your relationship with God and explore His Word. Our mission is to support you on your faith journey, helping you find answers and encouragement for every life challenge. Begin your walk with God anew today!",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "847yhzziee6dpi3qyb5ssf",
      "updatedAt": null,
      "username": "Bible Chat",
      "socialLinks": {
        "reddit": "",
        "twitter": "https://x.com/chat_bible22499",
        "facebook": "https://www.facebook.com/p/Biblechat-100093253920229/",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-847yhzziee6dpi3qyb5ssf-742078628.png",
      "category": "human",
      "countMessages": 27
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-12-11T13:02:47.125Z",
      "userId": generateObjectId(),
      "title": "Write My Book AI Agent",
      "slug": "writemybook-ai-agent-gjog",
      "subtitle": null,
      "description": "WriteMyBook AI Agent is a powerful AI assistant designed to guide and inspire aspiring authors in crafting their own books. Whether you're developing a captivating plot, building memorable characters, or perfecting your prose, WriteMyBook AI Agent offers creative prompts, structural guidance, and personalized feedback to bring your story to life.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "c1wk4xqz0ehayat7b1lsg",
      "updatedAt": "2024-12-11T13:06:13.628Z",
      "username": "Elly",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-c1wk4xqz0ehayat7b1lsg-22090875.png",
      "category": "human",
      "countMessages": 15
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-12-11T11:08:56.636Z",
      "userId": generateObjectId(),
      "title": "Ethereum AI Agent",
      "slug": "ethereum-ai-agent-tfwi",
      "subtitle": null,
      "description": "Ethereum AI Agent is an intelligent platform designed to enhance interactions with Ethereum, a decentralized blockchain platform known for its smart contract functionality. Launched in 2015 by Vitalik Buterin and others, Ethereum's native cryptocurrency, Ether (ETH), powers a wide range of decentralized applications and financial solutions.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "5gvhbs37sbb0331em22fnl2",
      "updatedAt": "2024-12-11T11:53:43.452Z",
      "username": "Community",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-5gvhbs37sbb0331em22fnl2-540850181.png",
      "category": "web-3",
      "countMessages": 1
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-12-11T11:03:17.199Z",
      "userId": generateObjectId(),
      "title": "Bitcoin AI Agent",
      "slug": "bitcoin-ai-agent-stex",
      "subtitle": null,
      "description": "Bitcoin AI Agent is an advanced platform leveraging AI to enhance interactions with Bitcoin, the pioneering cryptocurrency operating on a decentralized, proof-of-work blockchain. Launched in 2009 by an anonymous entity known as Satoshi Nakamoto, Bitcoin serves as a global digital currency and store of value.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "fndtpex3xekk0d4ct9ci7p",
      "updatedAt": "2024-12-11T11:54:40.478Z",
      "username": "Community",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-fndtpex3xekk0d4ct9ci7p-562204561.png",
      "category": "web-3",
      "countMessages": 9
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-11-21T19:08:47.585Z",
      "userId": generateObjectId(),
      "title": "Tailwind CSS AI Agent",
      "slug": "tailwind-css-ai-agent-mb7g",
      "subtitle": null,
      "description": "Whether you're new to utility-first design or a seasoned pro, this AI agent provides expert guidance on all things Tailwind CSS. Get help with layouts, responsiveness, customizations, best practices, and troubleshooting. Let's create beautiful, fast websites together!",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "qnkj1iixe402z74tie7b9q",
      "updatedAt": "2024-11-22T09:58:12.878Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-qnkj1iixe402z74tie7b9q-317650482.png",
      "category": "programmer",
      "countMessages": 31
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-11-21T19:01:28.549Z",
      "userId": generateObjectId(),
      "title": "React AI Agent",
      "slug": "react-agent-0pin",
      "subtitle": null,
      "description": "Whether you're a beginner or an advanced developer, this agent provides clear, expert guidance on everything React—from basic concepts to advanced optimization techniques. Get code examples, best practices, and solutions to your toughest React challenges now!",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "erh14q16ra2fx45ik7f5o",
      "updatedAt": "2024-11-22T09:57:18.753Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-erh14q16ra2fx45ik7f5o-950041340.png",
      "category": "programmer",
      "countMessages": 31
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-11-12T16:32:00.914Z",
      "userId": generateObjectId(),
      "title": "LOP AI SALES AGENT",
      "slug": "lop-ai-sales-agent-g6x5",
      "subtitle": null,
      "description": "The purpose of this AI agent is to streamline real estate transactions by selling properties, generating leads, and addressing inquiries for both sales and rentals. It provides investors and buyers with comprehensive support, answering all relevant questions to aid decision-making. This agent is equipped to handle queries on various real estate topics, ensuring a seamless, informative experience for potential clients.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "w5tmwhtygud799yqdo6ot",
      "updatedAt": "2024-11-12T17:37:25.082Z",
      "username": "LAND OF PROFITS",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "https://www.facebook.com/landofprofits?mibextid=LQQJ4d",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-w5tmwhtygud799yqdo6ot-448542827.png",
      "category": "human",
      "countMessages": 159
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T15:26:36.155Z",
      "userId": generateObjectId(),
      "title": "Solana AI Agent",
      "slug": "solana-chatbot-bakc",
      "subtitle": null,
      "description": "Solana is a blockchain platform which uses a proof-of-stake mechanism to provide smart contract functionality. Its native cryptocurrency is SOL. Solana was launched in 2020 by Solana Labs, which was founded by Anatoly Yakovenko and Raj Gokal in 2018.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "dawskc5mgrdukr1x3nde0l",
      "updatedAt": "2024-10-17T12:25:54.031Z",
      "username": "Solana AI Agent",
      "socialLinks": {
        "reddit": "",
        "twitter": "solana",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-dawskc5mgrdukr1x3nde0l-75027605.png",
      "category": "web-3",
      "countMessages": 435
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T15:18:37.747Z",
      "userId": generateObjectId(),
      "title": "Talk with UI/UX Book",
      "slug": "talk-with-uiux-book-3xls",
      "subtitle": null,
      "description": "Drawing inspiration from Material Tailwind design, this UI/UX book is your guide to crafting beautiful, user-focused designs, starting with the basics and leading you all the way to complete web pages for your projects.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "roots-ui-ux-design-book",
      "updatedAt": null,
      "username": "Elisa",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-roots-ui-ux-design-book-589775470.png",
      "category": "programmer",
      "countMessages": 206
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:51:40.627Z",
      "userId": generateObjectId(),
      "title": "Python AI Agent",
      "slug": "phyton-chatbot-evhd",
      "subtitle": null,
      "description": "Introduce a Python chatbot agent that serves as a knowledgeable tutor, offering real-time guidance on Python programming. Whether it's explaining coding concepts, providing syntax help, or walking users through Python projects, this AI-powered assistant makes learning Python interactive and efficient, perfect for developers of all skill levels.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "pdr2zfptgo1f4q41o6q4wj",
      "updatedAt": "2024-10-17T12:27:37.674Z",
      "username": "Rose",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-pdr2zfptgo1f4q41o6q4wj-696235915.png",
      "category": "programmer",
      "countMessages": 23
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:46:37.214Z",
      "userId": generateObjectId(),
      "title": "Wordpress AI Agent",
      "slug": "wordpress-chatbot-jg8z",
      "subtitle": null,
      "description": "Empower your users with a WordPress chatbot agent that acts as an expert tutor, offering instant guidance on WordPress topics. Whether it's helping users build websites, navigate themes, or manage plugins, this AI-powered assistant delivers personalized lessons and step-by-step instructions, making WordPress learning accessible and engaging.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "6i526gsa83e5pcahogtads",
      "updatedAt": "2024-10-17T12:26:11.369Z",
      "username": "Rose",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-6i526gsa83e5pcahogtads-256022834.png",
      "category": "programmer",
      "countMessages": 22
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:26:08.658Z",
      "userId": generateObjectId(),
      "title": "SEO AI Agent",
      "slug": "seo-chatbot-8ixy",
      "subtitle": null,
      "description": "Need tips on finding the right keywords or making your site better? This SEO agent is here to give you clear advice and easy steps to follow. Improve your website's ranking and get more visitors.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "8psz0u6w0abafbdoptq2rs",
      "updatedAt": "2024-10-23T10:05:50.881Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-8psz0u6w0abafbdoptq2rs-614081569.png",
      "category": "human",
      "countMessages": 194
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:25:21.020Z",
      "userId": generateObjectId(),
      "title": "Psychologist AI Agent",
      "slug": "personal-psychologis-sgwf",
      "subtitle": null,
      "description": "You can engage in insightful conversations about various psychological theories, mental health, and human behavior. Whether you're curious about cognitive psychology, emotional well-being, or renowned psychological theories like Freud's psychoanalysis or Maslow's hierarchy of needs, this chatbot is here to help.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "sc3oa84myh4xnepyh4p3g",
      "updatedAt": "2024-10-23T10:05:55.232Z",
      "username": "RohanJ",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-sc3oa84myh4xnepyh4p3g-416981161.png",
      "category": "human",
      "countMessages": 91
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:24:47.476Z",
      "userId": generateObjectId(),
      "title": "Marketing AI Agent",
      "slug": "marketing-chatbot-viio",
      "subtitle": null,
      "description": "This Marketing Agent guides you in creating a marketing plan that works for your business. It helps you figure out your goals, understand your market, and choose the best ways to advertise. With this chatbot, you can make sure more people learn about your business and love what you offer.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "7b18svfg6e8bqupno9mf1f",
      "updatedAt": "2024-10-23T10:05:28.513Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-7b18svfg6e8bqupno9mf1f-305038687.png",
      "category": "human",
      "countMessages": 33
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:12:49.329Z",
      "userId": generateObjectId(),
      "title": "Social Media AI Agent",
      "slug": "social-media-chatbot-suib",
      "subtitle": null,
      "description": "Here is your Social Media AI, a friendly agent that helps you write great posts for any social media platform (Facebook, Twitter, Linkedin, Instagram, etc). Just tell it what you want to say, and it will help you create the right message. This chatbot makes posting fun and simple, whether you're sharing a photo, promoting something, or just updating your status.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "h28caam60lwze7d58c8m7k",
      "updatedAt": "2024-10-23T10:04:25.739Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-h28caam60lwze7d58c8m7k-308842794.png",
      "category": "human",
      "countMessages": 41
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:09:32.199Z",
      "userId": generateObjectId(),
      "title": "MultiversX AI Agent",
      "slug": "multiversx-chat-zp77",
      "subtitle": null,
      "description": "MultiversX, the EGLD network, is a distributed blockchain network for next-gen applications. Decentralized via 3,000+ nodes, scalable through sharding, fast, secure & green.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "vulrlt70qdbl5cjw99ppjf",
      "updatedAt": "2024-10-17T12:26:54.821Z",
      "username": "Community",
      "socialLinks": {
        "reddit": "",
        "twitter": "multiversx",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-vulrlt70qdbl5cjw99ppjf-293039105.png",
      "category": "web-3",
      "countMessages": 25
    },
    {
      "id": generateObjectId(),
      "createdAt": "2024-10-10T13:06:39.101Z",
      "userId": generateObjectId(),
      "title": "Business AI Agent",
      "slug": "business-development-t1t0",
      "subtitle": null,
      "description": "Meet your Business Development Agent, an AI designed to help you grow and improve your business. It guides you through planning and offers advice on how to expand, become more efficient, and bring new ideas to life. Whether you want to reach more customers, work with other businesses, or make your operations better, this chatbot can give you clear steps and useful tips.",
      "resources": null,
      "published": true,
      "status": "approved",
      "chatHash": "4kb3e6t6xhq4yuogrnwd2h",
      "updatedAt": "2024-10-23T10:01:05.256Z",
      "username": "arjun",
      "socialLinks": {
        "reddit": "",
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profileAvatar": "https://aimhuyyjdrhwdqhhowtv.supabase.co/storage/v1/object/public/gali-bucket/discover/image-4kb3e6t6xhq4yuogrnwd2h-522419428.png",
      "category": "human",
      "countMessages": 42
    }
  ];
  await prisma.discoverAgent.createMany({
    data: agentData,
    // skipDuplicates: true,
  });

  console.log("✅ Data inserted successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
