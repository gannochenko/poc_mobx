resource "kubernetes_deployment" "app-mobx" {
  metadata {
    name = "app-mobx"
    namespace = var.namespace
    labels = {
      name = "app-mobx"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        name = "app-mobx"
      }
    }

    template {
      metadata {
        namespace = var.namespace
        labels = {
          name = "app-mobx"
        }
      }

      spec {
        container {
          image = "/mobx:${local.version}"
          name  = "app-mobx"

          env {
            name = "NETWORK__HOST"
            value = var.host
          }

          env {
            name = "NETWORK__PORT"
            value = var.port
          }

          env {
            name = "NETWORK__CORS"
            value = ""
          }

          env {
            name = "API__URL"
            value = var.api-url
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = var.port
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }
}
