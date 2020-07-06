import { shallowMount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

const msg = "submit";
const factory = (propsData) => {
  return shallowMount(Greeting, {
    propsData: {
      msg,
      ...propsData
    }
  })
}

describe("Greeting.vue", () => {

  describe("has admin privileges", () => {
    it("renders message", () => {
      const wrapper = factory();
      expect(wrapper.find("span").text()).toBe("Not Authorized");
      expect(wrapper.find("button").text()).toBe("submit");      
    })
  })

  describe("not have admin privileges", () => {
    it("renders message", () => {
      const wrapper = factory({isAdmin: true});
      expect(wrapper.find("span").text()).toBe("Admin Privileges");
      expect(wrapper.find("button").text()).toBe("submit");    
    })
  })
})