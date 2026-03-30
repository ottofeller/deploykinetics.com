# Website specs

## Product description

Kinetics is a serverless cloud hosting platform for Rust applications. Other platforms such as TypeScript and Python are coming in the future. Kinetics provides backend developers with all the tools necessary to build performant and resilient distributed systems. It comes as CLI which handles deployment and management procedures over the user’s cloud instances.

All major kinetics features are listed on its [GitHub page](https://github.com/ottofeller/kinetics?tab=readme-ov-file#features), you can pick them up for the website right from there.
Kinetics is currently in open beta testing. We let teams build on top of it, and assist swiftly in solving all their issues. We expect the product to be fully production ready by Q1 2026.

## Keywords and key phrases

- Rust backend
- Rust functions
- Backend for Rust workloads
- Rust cloud hosting
- Rust backend with database
- REST API endpoint
- Queue worker
- Cron job
- No infrastructure management
- Local development for Rust
- CLI

## Metaphors for the product

- A lot of of gears in the box, with a few buttons on top of it
  - Which means abstracting away infrastructure
- Swiss knife
  - A backend for any load
- A rabbit, or a rocket
  - Rust is very fast and performant.

## Product’s added value

First of all kinetics abstracts away any infrastructure work and let’s engineers deploy any type of workload (REST API endpoint, queue worker, or a cron job) with no extra work. Engineers don’t spend time on provisioning resources, managing network and security policies, scaling, and other related things. They spend time coding real features.

Another important area which kinetics improves is a local development. Engineers can code in Rust offline, no internet connection required. This is also true for workloads which require a DB — we provision it locally. Also invocation of functions with custom payload is very simple.

## Goals of the website

- Acquire new users
  - Make them deploy their first app, maybe one of the examples that we provide in GitHub repo
- Inform on future pricing
  - We will publish prices, but before Q1 2026 users will only get a free plan
- Collect usage feedback
  - We want to talk to our users, either on video call, or over email.

## Audience

Our audience are backend developers with Rust experience. These are mostly web3, ML, or high load backend teams. These are people who want to build a fully-featured backend, with all types or workload, but don’t really want to provision or maintain infrastructure themselves.
Also kinetics is great for prototyping, as it allows for a very quick start. So pre-seed and seed startups will find it very handy.

## Competitors

So far [Shuttle](https://www.shuttle.dev/) is our closest competitor, although I wouldn’t use their website as example (I suppose it was built quite long ago). Among other competitors are https://render.com and https://fly.io. While [Shuttle.rs](http://shuttle.rs/) is a cloud platform for Rust only (just like kinetics at the moment), Render and Fly are much wider cloud hosting platforms, aimed at hosting any service wrapped in Docker container.

## Styling

Here are a few examples of designs to follow (these are not similar products, but rather good examples of design):

- https://warp.dev (this is the best one so far, I really like it)
- https://cursor.com
- https://koyeb.com
- https://zed.dev
- https://supabase.com
- https://inngest.com
- https://resend.com/home

A few things to follow in design:

- It should probably be a dark color palette, as the majority of websites for devs follow it
- kinetics comes as a CLI tool, show the screenshots of a terminal throughout the website (I will share screenshots)
- Also code snippets, add them
  - Examples [here](https://github.com/ottofeller/kinetics?tab=readme-ov-file#features)
- Don’t add the “used by” section
- Fancy animations and micro animations are very welcome.

## Website layout

Very likely just one page is enough to fit everything about kinetics in its current state. Here are suggestions about the layout of the page and their text copies (inspired by https://render.com ’s layout):

- Hero

<img width="2248" height="1710" alt="hero" src="https://github.com/user-attachments/assets/e9c9db38-5d5d-4d21-bdc2-8f28641be14f" />

  - Add an image (https://fly.io) or abstract animation (https://render.com)
  - Title of the section
    - “Deploy Rust backends, not infrastructure”
  - Longer description
    - “The platform for your crons|queue workers|REST APIs functions written in Rust”
      - The “crons|queue workers|REST APIs” should rotate the items with animation
      - Would be great if all these items are visible since the beginning, so that a visitor does not wait to observe all options

- Get started
  - Title of the section
    - “Tap, tap, deploy!”
  - Longer description
    - “Install kinetics with cargo and deploy your first app in a few seconds:”
  - Present the steps from GitHub page https://github.com/ottofeller/kinetics?tab=readme-ov-file#getting-started
- Features
  - Title of the section
    - “Kinetics runs all your backends”
  - Subsections
    - “Built for backend engineers”
      - “Supports any workload”
        - “Deploy REST API endpoints, queue workers, and cron jobs.”
        
        https://github.com/user-attachments/assets/5d0d6f7f-68a9-4f7b-8109-d0ce0c284d79
        
          - “Only Rust code required”
            - “Just apply attribute macro to your function, and Kinetics will handle the rest. No other tools required.”
          - “Works offline”
            - “Run your functions locally, with no connection to the internet. Requests to DB and queues are served locally as well.”
            
            https://github.com/user-attachments/assets/7e41a75b-2e4e-4fa4-9203-b50557b8a822
            
          - “No infrastructure management”
            - “The infrastructure is always provisioned automatically.”

        - “Provides data storage”
          - “Comes with SQL database”
            - “For every project we provision a SQL DB, with connection string being added to function config automatically.”
          - “Built-in database migrations”
            - “SQL migrations are built-in and require no additional configuration. They are applied automatically when a function is invoked locally.”
        - “Comes with all the batteries”
          - “Environment variables”
            - “Define environment variables for your functions right in your code. Deploy env updates seprately, no need to redeploy the entire function.”
          - “ Secrets”
            - “Automatically provision secrets from `.env.secrets` file and make it available in your functions.”
          - “Logs”
            - “Monitor your functions with just CLI. Each function gets its own stream of logs.”

- Examples
  - Title
    - “Kinetics in examples”
  - Description
    - “All examples are available in our GitHub repository [here](https://github.com/ottofeller/kinetics/tree/main/examples). Install kinetics (link to Get started section), and run `kinetics deploy`. Or simply call them locally with `kinetics invoke`.”
  - Add a widget with tabs, similar to the one from “How it works” section on https://shuttle.dev website
    - Add tabs with these examples there:
      - “Basic endpoint”
        - https://github.com/ottofeller/kinetics/blob/main/examples/src/basic/endpoint.rs
      - “Database”
        - https://github.com/ottofeller/kinetics/blob/main/examples/src/database.rs
      - “Send a message to a queue”
        - https://github.com/ottofeller/kinetics/blob/main/examples/src/queue.rs
- Plans
  - Free
    - Up to 100,000 functions invocations
    - Function memory limit 128mb
  - Starter (coming soon)
    - Up to 1,000,000 functions invocations
    - Function memory limit 256mb
    - $10/month
  - Growth (coming soon)
    - Up to 10,000,000 functions invocations
    - Function memory limit 256mb
    - $80/month
  - Enterprise (coming soon)
    - More than 10,000,000 functions invocations
    - Function memory limit 512mb
      - Higher limits discussed separately
    - Pay per usage, discounts apply
- Get in touch
  - Email
  - “Book a meeting with us”
    - Embed the booking page (or link)
      - https://support.google.com/calendar/answer/10733297?hl=en&co=GENIE.Platform%3DDesktop
