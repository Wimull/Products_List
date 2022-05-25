import {
	productsProperties,
	ProductsPropertiesType,
	ProductTypes,
} from "../../App";

export function getPropertyText(
	type: ProductTypes,
	property: {
		type: ProductsPropertiesType;
		value: { [name: string]: string };
	}
): string {
	let propertyText = "";
	switch (type.toLocaleLowerCase()) {
		case "book":
			propertyText = `${property.value[property.type]} ${
				productsProperties["Book"].props[0].measurement
			}`;
		case "dvd":
			propertyText = `${property.value[property.type]} ${
				productsProperties["Dvd"].props[0].measurement
			}`;
			break;
		case "furniture":
			propertyText = `${property.value["Length"]}x${property.value["Width"]}x${property.value["Height"]}`;
			break;
		default:
			propertyText =
				"Error: propertyText for this type not yet implemented/missing.";
	}
	return propertyText;
}
