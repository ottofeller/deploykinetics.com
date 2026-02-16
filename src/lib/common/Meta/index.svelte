<script lang="ts">
  import {meta} from '$content/meta'

  let {
    author = meta.siteAuthor,
    canonicalUrl,
    date,
    description = meta.siteDescription,
    image = meta.ogImage,
    imageSquare = meta.ogImageSquare,
    keywords = [],
    noindex = false,
    title = meta.siteTitle,
  }: {
    author?: string
    canonicalUrl?: string
    date?: string
    description?: string
    image?: string
    imageSquare?: string
    keywords?: Array<string>
    noindex?: boolean
    title?: string
  } = $props()

  const siteKeywords = $derived([...keywords, ...meta.siteKeywords].join(', '))
</script>

<svelte:head>
  <title>{meta.siteName} — {title}</title>

  {#if noindex && !canonicalUrl}
    <meta name="robots" content="noindex" />
  {/if}

  <meta content={title} property="og:title" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta content={description} property="og:description" />
  <meta name="description" content={description} />
  <meta content={image} property="og:image" />
  <meta content="1200" property="og:image:width" />
  <meta content="630" property="og:image:height" />
  <meta content={imageSquare} property="og:image" />
  <meta content="300" property="og:image:width" />
  <meta content="300" property="og:image:height" />
  <meta name="twitter:image" content="{meta.siteUrl}{image}" />
  <meta name="keywords" content={siteKeywords} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content={meta.siteThemeColor} />
  <meta content="website" property="og:type" />
  <meta content={meta.siteName} property="og:site_name" />
  <meta content={author} property="article:author" />
  <meta name="author" content={author} />

  {#if canonicalUrl}
    <meta content={canonicalUrl} property="og:url" />
    <meta name="twitter:url" content={canonicalUrl} />
    <link href={canonicalUrl} rel="canonical" />
  {/if}

  {#if date}
    <meta content={date} property="article:published_time" />
  {/if}
</svelte:head>
