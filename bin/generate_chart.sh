#!/bin/bash

printf "apiVersion: ${CHART_API_VERSION}\n" > .gitops/helm/oauth-reference-integration/Chart.yaml
printf "description: Chart for deployment\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "name: oauth-reference-integration\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "version: 0.1.0\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "dependencies:\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "- name: $CHART_NAME\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "  version: $CHART_VERSION\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "  repository: $CHART_REPOSITORY\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml
printf "  alias: $CHART_ALIAS\n" >> .gitops/helm/oauth-reference-integration/Chart.yaml

printf "microservice:\n" > .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  environment: sandbox\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  nameOverride: oauth-reference-integration\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  podDefaults:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "    env:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      sandbox:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        NODE_ENV: production\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        CHECKR_API_URL: ${CHECKR_API_URL}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        CHECKR_OAUTH_CLIENT_SECRET: ${CHECKR_OAUTH_CLIENT_SECRET}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        ENCRYPTION_SECRET_KEY: ${ENCRYPTION_SECRET_KEY}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        REACT_APP_CHECKR_OAUTH_CLIENT_ID: ${REACT_APP_CHECKR_OAUTH_CLIENT_ID}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        REACT_APP_CHECKR_PARTNER_URL: ${REACT_APP_CHECKR_PARTNER_URL}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        S3_ACCESS_KEY_ID: ${S3_ACCESS_KEY_ID}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        S3_ACCESS_KEY_SECRET: ${S3_ACCESS_KEY_SECRET}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        S3_BUCKET: ${S3_BUCKET}\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  deployments:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      command: ['node', 'server.js']\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      replicaCount: $REPLICA_COUNT\n\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  ingresses:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      type: $INGRESS_TYPE\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      hosts:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        - host: $INGRESS_HOSTS\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "          serviceName: web\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "          servicePort: 80\n\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "  services:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      ports:\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "        - port: 80\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "          targetPort: 8000\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
printf "      selector: web\n" >> .gitops/helm/oauth-reference-integration/sandbox_us.yaml
