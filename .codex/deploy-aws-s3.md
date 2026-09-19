# Deploy to AWS S3 + CloudFront

Steps to deploy the built frontend to AWS S3 and serve via CloudFront:

1. Build: `npm run build` (ensures `dist/` is created).
2. Create an S3 bucket configured for static website hosting or as a private bucket behind CloudFront.
3. Upload `dist/` contents to S3 (use `aws s3 sync dist/ s3://your-bucket`).
4. Create/Update CloudFront distribution pointing to the S3 origin, set caching and compression, and configure an HTTPS certificate via ACM.
5. Invalidation: after deploy, run `aws cloudfront create-invalidation --distribution-id <id> --paths '/*'` to refresh cache.

Automation:
- Prefer a CI pipeline (GitHub Actions) that builds, runs tests, and then deploys to S3 using an encrypted AWS access key stored in repo secrets.

Notes:
- For single-page apps, set `ErrorDocument` to `index.html` so routes are handled client-side.
- Use `Cache-Control` headers to balance freshness vs CDN performance.
