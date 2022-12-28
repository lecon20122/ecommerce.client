import { Variation } from '../framework/basic-rest/types';
import { CSSProperties } from 'react';


export const variationColorFactory = (variation: Variation): CSSProperties => {
    if (variation?.color?.color) {
        return {
            backgroundImage: `url(${variation.color.color})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: "none",
        }
    } else {
        return {
            backgroundColor: variation.variation_type_value.hex_value
        }
    }
}