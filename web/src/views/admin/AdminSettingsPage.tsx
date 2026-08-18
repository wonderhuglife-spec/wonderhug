'use client'

import { useState } from 'react'
import { getWorkingCms, saveCmsSettings } from '@/cms/store'
import { persistRemoteCms } from '@/cms/remote'
import { defaultSettings } from '@/cms/seed'
import { Button } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminSettingsPage() {
  const [settings, setSettings] = useState(() => ({ ...defaultSettings(), ...getWorkingCms().settings }))
  const [notice, setNotice] = useState<string | null>(null)

  return (
    <>
      <Seo title="Settings · WonderHug CMS" description="Homepage hero and site tagline." path="/admin/settings" />
      <h1 className="font-serif text-3xl">Settings</h1>
      <p className="mt-2 max-w-2xl text-slate">Homepage hero copy and cover. English is the public website language.</p>
      <form
        className="mt-8 max-w-2xl space-y-5 rounded-2xl border border-[#c3c4c7] bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault()
          const next = saveCmsSettings(settings)
          void persistRemoteCms(next).then((error) => setNotice(error ?? 'Homepage settings saved.'))
        }}
      >
        <div>
          <Label htmlFor="kicker">Hero kicker</Label>
          <Input id="kicker" value={settings.heroKicker} onChange={(event) => setSettings({ ...settings, heroKicker: event.target.value })} />
        </div>
        <div>
          <Label htmlFor="title">Hero title</Label>
          <Input id="title" value={settings.heroTitle} onChange={(event) => setSettings({ ...settings, heroTitle: event.target.value })} />
        </div>
        <div>
          <Label htmlFor="body">Hero body</Label>
          <Textarea id="body" value={settings.heroBody} onChange={(event) => setSettings({ ...settings, heroBody: event.target.value })} />
        </div>
        <div>
          <Label htmlFor="image">Hero image URL</Label>
          <Input id="image" value={settings.heroImageUrl} onChange={(event) => setSettings({ ...settings, heroImageUrl: event.target.value })} />
        </div>
        <div>
          <Label htmlFor="alt">Hero image alt</Label>
          <Input id="alt" value={settings.heroImageAlt} onChange={(event) => setSettings({ ...settings, heroImageAlt: event.target.value })} />
        </div>
        <div>
          <Label htmlFor="tagline">Site tagline</Label>
          <Input id="tagline" value={settings.siteTagline} onChange={(event) => setSettings({ ...settings, siteTagline: event.target.value })} />
        </div>
        <Button type="submit">Save settings</Button>
        {notice ? <p className="text-sm text-navy">{notice}</p> : null}
      </form>
    </>
  )
}
