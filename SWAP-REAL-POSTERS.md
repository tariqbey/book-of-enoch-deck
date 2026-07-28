# Swapping in the real comparable posters

I (Claude) can't fetch and republish the studios' copyrighted posters on the public site,
but the code already supports any image. To use the real ones:

1. Save the three poster images yourself (e.g. from Google Images) as:
   - client/public/comps/3-body-problem.jpg
   - client/public/comps/watchmen.jpg
   - client/public/comps/arrival.jpg
2. Tell Claude "swap the comps to the local posters" — or edit `comparables` in
   client/src/pages/Home.tsx, replacing each `image:` URL with
   `${import.meta.env.BASE_URL}comps/<file>.jpg`
3. Rebuild + deploy (Claude can do this part).

Note: real posters on a PUBLIC pitch site is a rights risk — fine in a private deck,
riskier at a public URL. Consider keeping the site passcode-gated context in mind.
