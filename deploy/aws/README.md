# AWS Deployment

This site is static HTML/CSS/JS. On AWS it runs as **S3 static website hosting** behind **CloudFront** (recommended for HTTPS and custom domains).

The same `deploy/build.sh` script packages the site for both GitHub Pages and AWS.

---

## Architecture

```
GitHub push (manual workflow)
       │
       ▼
  deploy/build.sh  →  dist/
       │
       ▼
  aws s3 sync  →  S3 bucket
       │
       ▼
  CloudFront  →  partnerspestsolutions.com
```

---

## One-time AWS setup

### 1. Create an S3 bucket

1. AWS Console → **S3** → **Create bucket**
2. **Bucket name:** e.g. `partnerspestsolutions.com` (must be globally unique)
3. **Region:** `us-east-1` (or your preferred region)
4. **Block all public access:** OFF (required for static website hosting)
   - Acknowledge the warning — CloudFront will be the public entry point; bucket policy can restrict direct access later
5. Create the bucket

### 2. Enable static website hosting

1. Open the bucket → **Properties** → **Static website hosting** → **Edit**
2. **Enable**
3. **Index document:** `index.html`
4. **Error document:** `index.html` (optional; helps with client-side routing if added later)
5. Save

### 3. Bucket policy (allow CloudFront or public read)

For a simple setup with public S3 website endpoint:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

For production, prefer **Origin Access Control (OAC)** so only CloudFront can read the bucket. See [AWS CloudFront + S3 OAC docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).

### 4. Create a CloudFront distribution (recommended)

1. AWS Console → **CloudFront** → **Create distribution**
2. **Origin domain:** select your S3 bucket (website endpoint or REST endpoint with OAC)
3. **Viewer protocol policy:** Redirect HTTP to HTTPS
4. **Default root object:** `index.html`
5. **Alternate domain name (CNAME):** `partnerspestsolutions.com` (and `www` if needed)
6. **Custom SSL certificate:** request or import via **ACM** in `us-east-1`
7. Create distribution — note the **Distribution ID**

### 5. DNS

Point `partnerspestsolutions.com` to the CloudFront distribution (CNAME or Route 53 alias record).

---

## GitHub Actions setup (OIDC — no long-lived AWS keys)

### 1. Create an IAM OIDC identity provider for GitHub

1. IAM → **Identity providers** → **Add provider**
2. **Provider type:** OpenID Connect
3. **Provider URL:** `https://token.actions.githubusercontent.com`
4. **Audience:** `sts.amazonaws.com`

### 2. Create a deploy role

Create a role trusted by your repo, e.g. `GitHubActionsPartnersPestDeploy`:

**Trust policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:PatGuettler/partners-pest-control:*"
        }
      }
    }
  ]
}
```

**Permissions policy** (adjust ARNs):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

### 3. Add GitHub repository secrets and variables

**Secrets** (Settings → Secrets and variables → Actions):

| Name | Value |
|------|-------|
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::ACCOUNT:role/GitHubActionsPartnersPestDeploy` |
| `AWS_S3_BUCKET` | Your bucket name |

**Variables** (optional):

| Name | Value |
|------|-------|
| `AWS_REGION` | `us-east-1` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront distribution ID |

### 4. Deploy

1. GitHub → **Actions** → **Deploy to AWS S3** → **Run workflow**
2. Confirm files appear in the S3 bucket
3. Open your CloudFront URL or custom domain

---

## Local deploy (without GitHub Actions)

```bash
# Package
bash deploy/build.sh

# Sync (requires AWS CLI configured)
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Switching from GitHub Pages to AWS

1. Complete AWS setup above
2. Point `partnerspestsolutions.com` DNS from GitHub Pages to CloudFront
3. GitHub Pages workflow can stay enabled for staging, or disable it in **Settings → Pages**
