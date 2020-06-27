resource "kubernetes_service" "app-mobx" {
  metadata {
    name = "app-mobx"
    namespace = var.namespace
  }
  spec {
    selector = {
      name = "app-mobx"
    }
    port {
      port = var.port
    }
  }
}
