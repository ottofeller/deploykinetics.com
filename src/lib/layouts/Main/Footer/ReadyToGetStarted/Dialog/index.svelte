<script lang="ts">
  import type {MouseEventHandler} from 'svelte/elements'
  import {fade} from 'svelte/transition'
  import iconClose from './icon-close.svg'
  import Block from '$lib/common/Block/index.svelte'
  import Section from '$lib/common/Section/index.svelte'
  import Spinner from '$lib/common/Spinner/index.svelte'
  import {closeByEscape, focusTrap, scrollLock} from '$lib/common/attachments'

  let {
    hide,
  }: {
    hide: VoidFunction
  } = $props()

  let isIframeLoaded = $state(false)

  const onload = () => {
    isIframeLoaded = true
  }

  let contentElement: HTMLElement = $state(null!)

  const onBackdropClick: MouseEventHandler<HTMLElement> = (event) => {
    if (event.target instanceof HTMLElement && !contentElement.contains(event.target)) {
      hide()
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 top-(--header-height) bottom-0 z-30 bg-08090a/80"
  {@attach closeByEscape(hide)}
  {@attach focusTrap}
  {@attach scrollLock}
  onclick={onBackdropClick}
  transition:fade|global={{duration: 300}}
>
  <Section class="h-full" isLast>
    <Block
      class="col-start-[outer-start] col-end-[inner-start] -mr-px -mb-px ml-(--outer-indent-x) lg:col-end-[track-start_4]"
      isLast
    />

    <div
      bind:this={contentElement}
      class="col-[inner] grid grid-rows-[auto_minmax(0,1fr)] bg-0d0e0f lg:col-[track-start_4/track-end_9]"
    >
      <Block class="-mb-px">
        <div class="relative grid gap-y-4 py-4">
          <h2 class="text-h2">
            Book a
            <br />
            meeting
            <span class="text-838484">with us</span>
          </h2>

          <p class="max-w-[16em] text-838484">Book a technical call to walk through your use case and architecture.</p>

          <button
            class="absolute top-0 right-0 cursor-pointer transition-[filter] hover:drop-shadow-[0_0_--spacing(1)_rgb(from_var(--color-82f1f7)_r_g_b)]"
            aria-label="Close"
            onclick={hide}
            type="button"
          >
            <span style:--mask="url('{iconClose}')" class="block size-6 bg-current mask-(--mask)"></span>
          </button>
        </div>
      </Block>

      <Block isLast>
        <div class="grid h-full overflow-clip rounded-xl bg-[#ffffff] *:size-full *:bg-inherit *:span-full">
          <!-- FIXME: Add download error handling. -->
          <!-- Google Calendar Appointment Scheduling begin -->
          <iframe
            frameborder="0"
            {onload}
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ21YPbx86HLWhJ-1GICb6SZNmcPKK1AatSq6gUUxBWmzh40WHKVqBdXivG50qqzVGiljzdrs4Wa?gv=true"
            title="15 minutes call"
          ></iframe>
          <!-- end Google Calendar Appointment Scheduling -->

          {#if !isIframeLoaded}
            <div class="grid place-items-center" out:fade={{duration: 300}}>
              <Spinner class="text-0b0b0b" />
            </div>
          {/if}
        </div>
      </Block>
    </div>

    <Block
      class="col-start-[inner-end] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px lg:col-start-[track-end_9]"
      isLast
    />
  </Section>
</div>
