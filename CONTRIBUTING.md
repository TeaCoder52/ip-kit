# Contributing

This repository contains the source code for ip-kit — a security-first toolkit for reliably resolving real client IP addresses across Node.js frameworks.

The project is community-driven, and every contribution helps make ip-kit more robust, secure, and useful for developers worldwide.

Before contributing, please read this document carefully — it explains everything you need to know to get started effectively.

---

## Содержание

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Coding Guidelines](#coding-guidelines)
6. [Commit Message Guidelines](#commit-message-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Reporting Issues](#reporting-issues)
9. [Acknowledgements](#acknowledgements)

---

## Code of Conduct

Please treat all contributors with respect and help maintain a welcoming, friendly environment.

Any form of harassment, discrimination, or toxic behavior is **not tolerated**.

-   Be polite and respectful
-   Provide constructive feedback
-   Help others learn and grow
-   Report unacceptable behavior to the maintainers

You can read the full Code of Conduct in [CODE_OF_CONDUCT.md](https://github.com/TeaCoder52/ip-kit/tree/main/CODE_OF_CONDUCT.md).

---

## How to Contribute

We welcome contributions from everyone. Here’s how to get started:

1. Fork this repository
2. Clone your fork locally:
    ```bash
    git clone https://github.com/TeaCoder52/ip-kit.git
    cd ip-kit
    ```
3. Create a new branch for your change:
    ```bash
    git checkout -b feat/improve-trust-proxy
    ```
4. Make your changes (code, tests, docs, etc.)
5. Commit your changes following the commit rules
6. Push your branch to your fork
7. Open a Pull Request to the main repository

## Project Structure

```txt
.github/       # GitHub workflows and templates
docs/          # VitePress documentation
packages/
├─ core        # Core IP extraction & trust logic
├─ express     # Express adapter
```

-   core contains all security-critical logic
-   adapters should stay thin and framework-specific

## Development Setup

This project uses **pnpm** and **TypeScript**.

```bash

```

pnpm install
pnpm test
pnpm build

---

Useful commands:

-   `pnpm -r test` - run all tests
-   `pnpm -r build` - build all packages
-   `pnpm docs:dev` - start documentation site

## Coding Guidelines

1. Prefer clarity over cleverness
2. Security-sensitive code must be well-documented
3. All public APIs should be typed and tested
4. Avoid breaking changes unless absolutely necessary
5. Follow existing project conventions

If your change affects public behavior, **tests are required**.

## Commit Message Guidelines

To keep a clean and readable commit history, we use conventional commits. All commit messages must be written in English and use the imperative mood (Add, Fix, Update, Remove).

### 1. Commit message structure

```bash
<type>: <short description>

(optional detailed description)
```

-   **type** - category of the change
-   **short description** - max 50 characters
-   **подробное описание** - optional, for context

**Example:**

```bash
feat: add CIDR-based trust proxy matcher

- Implement IPv4 and IPv6 CIDR matching
- Add full test coverage
```

### 2. Commit types

| Prefix   | Description                           | Example                                       |
| -------- | ------------------------------------- | --------------------------------------------- |
| feat     | New feature                           | feat: add Fastify adapter                     |
| fix      | Bug fix                               | fix: handle invalid forwarded header          |
| chore    | Tooling, config, or maintenance       | chore: update pnpm workspace config           |
| refactor | Code refactor without behavior change | refactor: simplify extractor pipeline         |
| perf     | Performance improvement               | perf: optimize CIDR matcher                   |
| docs     | Documentation changes                 | docs: add trust proxy guide                   |
| ci       | CI/CD changes                         | ci: add npm publish workflow                  |
| revert   | Revert a previous commit              | revert: revert "feat: add trust proxy preset" |

### 3. Rules

-   Commit messages must be clear and descriptive
-   Keep the summary under 50 characters
-   Use imperative verbs
-   Scope is optional but encouraged:
    ```bash
    feat(core): add cloudflare trust preset
    ```

## Pull Request Process

1. Make sure your branch is up to date with main
2. Ensure all tests pass
3. Add or update tests if needed
4. Add a changeset if the public API changes
5. Clearly describe what the PR does and why
6. Respond to review feedback

Once approved, the PR will be merged by a maintainer.

## Reporting Issues

If you encounter a problem:

-   Open a new issue using the [appropriate template](https://github.com/TeaCoder52/ip-kit/tree/main/.github/ISSUE_TEMPLATE)
-   Provide as much detail as possible
-   Include code examples or logs if relevant

**Security issues should NOT be reported publicly.** Please use GitHub Security Advisories instead.

## Acknowledgements

Thank you to everyone who contributes to ip-kit 🚀
Every issue, PR, discussion, or suggestion helps improve the project.

-   **Maintainer:** [TeaCoder](https://github.com/TeaCoder52)
-   **Contributors:** Everyone who helps improve ip-kit

Your contributions are truly appreciated. Together, we’re building a safer and more reliable foundation for IP handling.
