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

printf "microservice:\n" > .gitops/helm/oauth-reference-integration/production.yaml
printf "  environment: production\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "  nameOverride: oauth-reference-integration\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "  podDefaults:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "    env:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      production:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        CHECKR_API_URL: ${CHECKR_API_URL}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        CHECKR_OAUTH_CLIENT_SECRET: ${CHECKR_OAUTH_CLIENT_SECRET}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        ENCRYPTION_SECRET_KEY: ${ENCRYPTION_SECRET_KEY}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        REACT_APP_CHECKR_OAUTH_CLIENT_ID: ${REACT_APP_CHECKR_OAUTH_CLIENT_ID}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        REACT_APP_CHECKR_PARTNER_URL: ${REACT_APP_CHECKR_PARTNER_URL}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        S3_ACCESS_KEY_ID: ${S3_ACCESS_KEY_ID}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        S3_ACCESS_KEY_SECRET: ${S3_ACCESS_KEY_SECRET}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        S3_BUCKET: ${S3_BUCKET}\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "  deployments:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      command: ['node', 'server.js']\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      replicaCount: $REPLICA_COUNT\n\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "  ingresses:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      type: $INGRESS_TYPE\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      hosts:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        - host: $INGRESS_HOSTS\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "          serviceName: web\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "          servicePort: 80\n\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "  services:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "    web:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      ports:\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "        - port: 80\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "          targetPort: 5000\n" >> .gitops/helm/oauth-reference-integration/production.yaml
printf "      selector: web\n" >> .gitops/helm/oauth-reference-integration/production.yaml

echo "production"
cat .gitops/helm/oauth-reference-integration/production.yaml