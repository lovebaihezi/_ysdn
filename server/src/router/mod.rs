pub mod post {
    use actix_web::{get, post, HttpRequest, HttpResponse};
    use serde_json::json;
    use std::collections::HashMap;
    use std::format;

    #[get("/")]
    pub async fn index(req: HttpRequest) -> HttpResponse {
        req.uri();
        print!("{:#?}\n{:#?}\n", req.connection_info(), req.uri());
        HttpResponse::Ok().body(format!("{:#?}", req))
    }
}
