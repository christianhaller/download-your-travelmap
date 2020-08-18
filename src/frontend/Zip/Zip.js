var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JSZip from "jszip/dist/jszip";
import { kml } from "./kml";
import { csv } from "./csv";
export class Zip {
    create(data, flags, png) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = data;
            const zip = new JSZip();
            zip.file(`${username}.csv`, csv(data.places));
            zip.file(`${username}.kml`, kml(data));
            zip.file(`${username}.png`, png);
            if (flags) {
                zip.file(`${username}.txt`, flags);
            }
            return zip.generateAsync({ type: "blob" });
        });
    }
}
