import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class StringToArrayPipe implements PipeTransform {
    transform(value: string | string[]) : string[] {
        if (Array.isArray(value)) {
            return value;
        }
        value = value.replace(/\s+/g, '');
        return value.split(',');
    }
}