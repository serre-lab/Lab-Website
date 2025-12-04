# Security Audit Report

**Date:** December 2, 2025  
**Project:** Lab Website  
**Total Vulnerabilities:** 15 (4 critical, 2 high, 4 moderate, 5 low)

---

## Executive Summary

Security audit found 15 vulnerabilities in npm dependencies. Most are in development dependencies or transitive dependencies, with the most critical issues in the `vite-plugin-md` dependency chain and `playwright`. All vulnerabilities have fixes available via `npm audit fix`.

**Risk Assessment:**
- **Production Risk:** LOW (most vulnerabilities are in devDependencies)
- **Development Risk:** MODERATE (dev server vulnerabilities could affect local development)
- **Action Required:** YES - Update dependencies

---

## Vulnerabilities by Severity

### Critical (4)

1. **happy-dom** (via vite-plugin-md)
   - **Issue:** VM Context Escape can lead to Remote Code Execution
   - **CWE:** CWE-94 (Code Injection)
   - **Advisory:** GHSA-37j7-fg3j-429f
   - **Fix:** Update to >=20.0.0
   - **Risk:** Only affects development/build tools

2. **happy-dom** (via vite-plugin-md)
   - **Issue:** Server side code can be executed by a `<script>` tag
   - **CWE:** CWE-79 (Cross-site Scripting)
   - **Advisory:** GHSA-96g7-g7g9-jxw8
   - **Fix:** Update to >=15.10.2
   - **Risk:** Only affects development/build tools

3. **@yankeeinlondon/happy-wrapper** (via vite-plugin-md)
   - **Issue:** Depends on vulnerable happy-dom
   - **Fix:** Update transitive dependency

4. **@yankeeinlondon/builder-api** (via vite-plugin-md)
   - **Issue:** Depends on vulnerable dependencies
   - **Fix:** Update transitive dependency

### High (2)

1. **playwright** (direct devDependency)
   - **Issue:** Downloads browsers without verifying SSL certificate authenticity
   - **Advisory:** GHSA-7mvr-c777-76hp
   - **Fix:** Update to >=1.55.1
   - **Risk:** Affects browser installation during testing setup
   - **Action:** Update `playwright` in package.json

2. **@playwright/test** (direct devDependency)
   - **Issue:** Depends on vulnerable playwright
   - **Fix:** Update to latest version

### Moderate (4)

1. **esbuild** (via vite)
   - **Issue:** Development server request vulnerability
   - **Advisory:** GHSA-67mh-4wv8-2f99
   - **CWE:** CWE-346 (Origin Validation Error)
   - **Fix:** Update to >0.24.2
   - **Risk:** Only affects local development server

2. **vite** (direct devDependency)
   - **Issues:** Multiple server.fs.deny bypass vulnerabilities
   - **Fix:** Update to latest version
   - **Risk:** Only affects local development server

3. **js-yaml** (via vite-plugin-md)
   - **Issue:** Prototype pollution in merge operation
   - **Advisory:** GHSA-mh29-5h37-fv8m
   - **CWE:** CWE-1321 (Prototype Pollution)
   - **Fix:** Update to >4.1.0
   - **Risk:** Only affects markdown processing during build

4. **mdast-util-to-hast** (via vite-plugin-md)
   - **Issue:** Unsanitized class attribute
   - **Advisory:** GHSA-4fh9-h7wg-q85m
   - **Fix:** Update to >13.2.0
   - **Risk:** Only affects markdown-to-HTML conversion

### Low (5)

1. **inferred-types** (via vite-plugin-md)
2. **brilliant-errors** (via vite-plugin-md)
3. **native-dash** (via vite-plugin-md)
4. **@yankeeinlondon/gray-matter** (via vite-plugin-md)

---

## Code Security Analysis

### ✅ No Security Issues Found

Checked for:
- ✅ No hardcoded API keys, passwords, or secrets
- ✅ No authentication tokens in code
- ✅ No user input without sanitization
- ✅ No SQL injection risks (static site, no database)
- ✅ No XSS vulnerabilities in production code

### Production Build Security

- **Static Site:** The site is a static React application, reducing attack surface
- **No Server-Side Code:** No backend services, reducing server-side vulnerabilities
- **Deployment:** Static files served via GitHub Pages (no server configuration)

---

## Key Finding: Unused Dependency

**vite-plugin-md is not being used!**
- Plugin is commented out in `vite.config.ts` (line 8: `// mdPlugin()`)
- Project uses `react-markdown` instead (already in dependencies)
- Removing this unused dependency will eliminate 4 critical vulnerabilities

**Action:** Remove `vite-plugin-md` from package.json immediately.

## Recommendations

### Immediate Actions (High Priority)

0. **Remove unused vite-plugin-md** (Eliminates 4 critical vulnerabilities)
   ```bash
   npm uninstall vite-plugin-md
   ```

### High Priority Updates

1. **Update Playwright** (Production Risk: Low, but recommended)
   ```bash
   npm install --save-dev playwright@latest @playwright/test@latest
   ```

2. **Update Vite** (Development Risk: Moderate)
   ```bash
   npm install --save-dev vite@latest
   ```

### Automated Fix (Recommended)

Run automated fix for all vulnerabilities:
```bash
npm audit fix
```

This will update packages that have compatible fixes available.

### Immediate Fix Available

1. **vite-plugin-md** - **NOT USED, CAN BE REMOVED!**
   - **Discovery:** Plugin is commented out in `vite.config.ts` (line 8: `// mdPlugin()`)
   - **Current Usage:** Project uses `react-markdown` instead (already in dependencies)
   - **Action:** Remove unused dependency to eliminate 4 critical vulnerabilities
   - **Fix:** Remove `vite-plugin-md` from package.json
   - **Impact:** Will eliminate:
     - 4 critical vulnerabilities (happy-dom, happy-wrapper, builder-api)
     - Multiple moderate/low vulnerabilities in dependency chain
     - Dependency conflict with vite 5

### Long-term Actions

1. **Dependency Management:**
   - Set up Dependabot or Renovate for automated dependency updates
   - Review dependencies quarterly
   - Consider removing unused dependencies

2. **Development Environment:**
   - Since vulnerabilities are mostly in devDependencies, they don't affect production
   - However, updating them prevents potential issues during development

---

## Detailed Vulnerability Information

### Vite Development Server Issues

**Impact:** Only affects local development server (localhost)
**Risk:** Low - doesn't affect production builds
**Fix:** Update vite to latest version

### Playwright SSL Verification

**Impact:** Browser downloads during test setup
**Risk:** Medium - could allow MITM attacks during browser installation
**Fix:** Update to playwright >=1.55.1

### Vite-plugin-md Dependencies

**Impact:** Markdown processing during build
**Risk:** Low - only affects build process, not production site
**Issues:**
- happy-dom RCE vulnerabilities
- js-yaml prototype pollution
- Multiple transitive dependency issues

**Options:**
1. Update vite-plugin-md if newer version available
2. Consider alternative markdown plugins
3. Wait for upstream fixes

---

## Verification Steps

After applying fixes:

1. **Verify Build:**
   ```bash
   npm run build
   ```

2. **Verify Tests:**
   ```bash
   npm test
   ```

3. **Check Remaining Issues:**
   ```bash
   npm audit
   ```

4. **Review Changes:**
   ```bash
   git diff package.json package-lock.json
   ```

---

## Additional Security Best Practices

### ✅ Already Implemented

- Static site architecture (no server-side vulnerabilities)
- No user authentication (reduces attack surface)
- Content Security Policy considerations
- HTTPS enforced (via GitHub Pages)

### Recommended Additions

1. **Content Security Policy (CSP):**
   - Add CSP headers in production deployment
   - Restrict script sources to trusted domains

2. **Dependency Monitoring:**
   - Enable GitHub Dependabot alerts
   - Set up automated security scanning

3. **Regular Updates:**
   - Schedule monthly dependency reviews
   - Keep build tools up to date

---

## Summary

**Current Status:** 15 vulnerabilities found, all fixable  
**Production Risk:** LOW  
**Development Risk:** MODERATE  
**Action Required:** Run `npm audit fix` to update dependencies  

The vulnerabilities are primarily in development dependencies and do not affect the production static site. However, updating dependencies is recommended to:
- Secure the development environment
- Prevent potential build-time issues
- Follow security best practices

**Next Steps:**
1. Run `npm audit fix`
2. Test build and application
3. Commit updated package-lock.json
4. Consider setting up automated dependency updates

