import * as thrashService from "./services/thrash.service";

export class Controller {

  constructor(private app: any) {
    this.routes();
  }

  public routes() {
    this.app.route("/").get(thrashService.welcomeMessage);

    this.app.route("/thrashs").get(thrashService.getAllThrash);

    this.app.route("/thrash").post(thrashService.addNewThrash);

    this.app
      .route("/thrash/:id")
      .delete(thrashService.deleteThrash)
      .put(thrashService.updateThrash);
  }
}
