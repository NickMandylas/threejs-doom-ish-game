import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default class BlasterScene extends THREE.Scene {
  private mtlLoader = new MTLLoader();
  private objLoader = new OBJLoader();

  async initalize() {
    const targetMtl = await this.mtlLoader.loadAsync("assets/targetA.mtl");
    targetMtl.preload();

    const t1 = await this.createTarget(targetMtl);
    t1.position.x = -1;
    t1.position.z = -3;

    const t2 = await this.createTarget(targetMtl);
    t2.position.x = 1;
    t2.position.z = -3;

    const t3 = await this.createTarget(targetMtl);
    t3.position.x = 2;
    t3.position.z = -3;

    const t4 = await this.createTarget(targetMtl);
    t4.position.x = -2;
    t4.position.z = -3;

    this.add(t1, t2, t3, t4);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 4, 2);
    this.add(light);
  }

  private async createTarget(mtl: MTLLoader.MaterialCreator) {
    this.objLoader.setMaterials(mtl);
    const modelRoot = await this.objLoader.loadAsync("assets/targetA.obj");
    modelRoot.rotateY(Math.PI * 0.5);
    return modelRoot;
  }

  update() {}
}
