#!/bin/bash
set -e

NAMESPACE="restaurantspace"

echo "Applying Kubernetes manifests for namespace: $NAMESPACE"

kubectl apply -f ../base/namespace.yaml

kubectl apply -f ../base/backend/
kubectl apply -f ../base/frontend/
kubectl apply -f ../base/postgres/
kubectl apply -f ../base/storage/

echo "Deployment completed..."
