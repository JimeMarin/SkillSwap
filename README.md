# SkillSwap 🔁
 
A freelancing platform where clients post jobs, freelancers submit proposals, and both can leave reviews after work is completed.
 
---
 
## 🚀 Tech Stack
 
- **Frontend:** Angular 
- **Styling:** SCSS
- **Backend API:** REST API hosted on DigitalOcean
- **Auth:** JWT (JSON Web Tokens)
 
---
 
## ✨ Features
 
- 🔐 User registration and login with JWT authentication
- 💼 Post, search, update, and complete jobs
- 📬 Submit and manage proposals
- ✅ Accept proposals — job moves automatically to `in_progress`
- ⭐ Leave reviews after job completion
- 📊 Platform stats (total users, active jobs, total value moved)
 
---
 
## 🔄 App Flow
 
```
1. User A registers and logs in
2. User A posts a job
3. User B registers and submits a proposal
4. User A accepts the proposal → job moves to in_progress
5. Owner or freelancer marks the job as completed
6. Both participants leave reviews
7. Ratings update automatically
```
 
---
 
## 🛣️ Routes
 
| Path | Component | Auth Required |
|------|-----------|---------------|
| `/login` | Login | Guest only |
| `/register` | Register | Guest only |
| `/users/me` | User Profile | ✅ |
| `/jobs/search` | Job Search | ❌ |
| `/job/new` | Job Create | ✅ |
| `/jobs/postings` | My Postings | ✅ |
| `/jobs/:id` | Job Info | ✅ |
| `/jobs/:id/update` | Job Update | ✅ |
| `/jobs/:id/complete` | Job Complete | ✅ |
| `/proposals/my-bids` | My Bids | ✅ |
| `/proposals/:id` | Proposal Details | ✅ |
| `/jobs/:job_id/review/:target_id` | Send Review | ✅ |
| `/reviews/user/:user_id` | User Reviews | ✅ |
| `/platform/stats` | Platform Stats | ✅ |
 
---


 
## 👩‍💻 Developers
 
**Jimena Marín - Luana Tonelli**
