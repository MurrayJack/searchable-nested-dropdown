import * as React from "react";
import * as enzyme from "enzyme";

import EnzymeAdapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new EnzymeAdapter() });

import { SearchableNestedDropdown } from ".";

describe("Searchable Nested Dropdown", () => {
  describe("Value Tests", () => {
    it("having a value should show it when the control is closed", () => {
      const props = {
        Value: {
          Item: {
            Caption: "Value Caption",
            ID: 1,
            Folder: false
          },
          Parent: {
            Caption: "Parent Caption",
            ID: 0,
            Folder: true
          }
        },
        Placeholder: "Please select a value"
      };

      const control = enzyme.mount(<SearchableNestedDropdown {...props} />);
      expect(control.find("HeaderCaptionValue").text()).toEqual("Value Caption");
    });

    it("having no value should show the control placeholder", () => {
      const props = {
        Placeholder: "Please select a value"
      };

      const control = enzyme.mount(<SearchableNestedDropdown {...props} />);
      expect(control.find("HeaderPlaceholderValue").text()).toEqual(
        "Please select a value"
      );
    });

    it("having a value should show the clear button and clicking on it should cleare the contol", () => {
      const props = {
        Value: {
          Item: {
            Caption: "Value Caption",
            ID: 1,
            Folder: false
          },
          Parent: {
            Caption: "Parent Caption",
            ID: 0,
            Folder: true
          }
        },
        Placeholder: "Please select a value"
      };

      const control = enzyme.mount(<SearchableNestedDropdown {...props} />);
      expect(control.find("[title='Remove Value']").length).toEqual(1);
    });

    it("having no value should not show you a button to clear the value", () => {
        const props = {
          Placeholder: "Please select a value"
        };
  
        const control = enzyme.mount(<SearchableNestedDropdown {...props} />);
        expect(control.find("[title='Remove Value']").length).toEqual(0);
      });
  });
});
