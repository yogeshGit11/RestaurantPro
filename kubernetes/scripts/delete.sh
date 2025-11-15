#!/bin/bash
set -e

NAMESPACE="restaurantspace"

echo "Deleting application..."

kubectl delete -f ../base/backend/ --ignore-not-found
kubectl delete -f ../base/frontend/ --ignore-not-found
kubectl delete -f ../base/postgres/deployment.yaml --ignore-not-found

echo "Application removed... Persistent data remains."
