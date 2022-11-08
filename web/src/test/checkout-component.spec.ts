import { mount } from "@vue/test-utils";
import Item from "../entities/Item";
import CatalogGateway from "../gateways/catalog-gateway";
import CheckoutHttpGateway from "../gateways/checkout-http-gateway";
import AxiosAdapter from "../infra/axios-adapter";
import CheckoutVue from "../views/Checkout.vue";

function sleep (ms: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}

test("Deve testar o componente checkout", async function () {
	const httpClient = new AxiosAdapter();
	// const catalogGateway = new CatalogHttpGateway(httpClient, "http://localhost:3002");
	const catalogGateway: CatalogGateway = {
		async getItems (): Promise<Item[]> {
			return [
				new Item(1, "Guitarra", 100)
			]
		}
	}
	const checkoutGateway = new CheckoutHttpGateway(httpClient, "http://localhost:3000");
	const wrapper = mount(CheckoutVue, {
		global: {
			provide: {
				catalogGateway,
				checkoutGateway
			}
		}
	});
	await sleep(100);
	await wrapper.get(".item-add").trigger("click");
	await sleep(100);
	expect(wrapper.get(".order-total").text()).toBe("Total - 1030");
});