import { mount } from "@vue/test-utils";
import Item from "../entities/Item";
import ItemComponentVue from "../components/ItemComponent.vue";

test("Deve testar o componente item", async function () {
	const item = new Item(1, "Guitarra", 1000);
	const wrapper = mount(ItemComponentVue, {
		props: {
			item
		}
	});
	expect(wrapper.get(".item-description").text()).toBe("Guitarra");
	expect(wrapper.get(".item-price").text()).toBe("1000");
});