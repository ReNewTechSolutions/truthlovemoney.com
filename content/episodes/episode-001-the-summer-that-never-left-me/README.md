# Episode 001: The Summer That Never Left Me

This folder contains the first long-form Lyon Den talking-head episode generation setup for HeyGen.

The HeyGen render is intentionally simple:

- Marguerite speaking only
- no captions
- no music
- no effects
- no cinematic scene generation
- no transitions
- transparent/removable background requested with `webm`
- neutral ivory background fallback

## Files

- `script.md` - polished spoken script and avatar direction
- `heygen-request.json` - HeyGen request template
- `heygen-request.prepared.json` - generated locally by the npm script
- `heygen-result.json` - generated locally after a successful API request

## Environment Variables

Required:

```bash
export HEYGEN_API_KEY="your_heygen_api_key"
export HEYGEN_VOICE_ID="the_voice_id_for_Marguerite_Voice_1"
```

Optional:

```bash
export HEYGEN_API_BASE_URL="https://api.heygen.com"
export HEYGEN_CREATE_ENDPOINT="/v3/videos"
export HEYGEN_STATUS_ENDPOINT_TEMPLATE="/v3/videos/{video_id}"
export HEYGEN_POLL_INTERVAL_MS="15000"
export HEYGEN_MAX_POLLS="90"
export HEYGEN_DRY_RUN="1"
```

Use `npm run generate:episode1 -- --dry-run` or `HEYGEN_DRY_RUN=1` to write `heygen-request.prepared.json` and print the sanitized v3 request body without calling the API.

The request uses HeyGen v3's flat avatar-video schema with top-level `type`, `avatar_id`, `script`, and `voice_id` fields.

## Render Instructions

1. Confirm the HeyGen avatar `610a6411cf0e4d58925b9cb7c122b973` is available in the connected HeyGen account.
2. Confirm the HeyGen voice ID for `Marguerite - Voice 1`.
3. Set `HEYGEN_API_KEY` and `HEYGEN_VOICE_ID`.
4. Run:

```bash
npm run generate:episode1
```

5. The script submits the video creation request and polls HeyGen until the render is ready.
6. Download the returned video URL from `heygen-result.json`.
7. Bring the talking-head render into Canva.
8. Add Lyon Den illustrations, transitions, music, and brand elements in Canva.

## Expected Output

A continuous talking-head narration performance suitable for compositing into the final branded episode.

If transparent `webm` output is not supported for the account/avatar, switch `output_format` in `heygen-request.json` to `mp4` and keep the neutral ivory background for easier removal or cropping in Canva.
