/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  CheckBox,
} from "react-native";
// import { CheckBox } from "@react-native-community/checkbox";
import PropTypes from "prop-types";
import SearchInput, { createFilter } from "react-native-search-filter";

{
  /* 
    <SearchList 
        data={data} 
        searchFields={["name", "description", "category", "subCategory"]} 
        visibleKeys={["name", "category", "description"]}
        flexWidth={[1,1,3]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={3} // Row-span
        searchBarWrapperStyle={null}
        searchBarStyle={null}
        titleStyle={null}
        dataStyle={{color: 'darkblue'}}
        inputPlaceholder="Search Here"
    /> 
*/
}

export default function SearchList({
  data,
  searchFields,
  visibleKeys,
  flexWidth,
  titleStyle,
  dataStyle,
  inputPlaceholder,
  searchBarWrapperStyle,
  searchBarStyle,
  buttonTitle,
  buttonColor,
  buttonPress,
  ...props
}) {
  const [searchItem, setSearchItem] = useState("");
  let [isSelected, setSelected] = useState(false);
  const [checked, setChecked] = useState([]);
  const filterData = data.filter(createFilter(searchItem, searchFields));

  const keys = visibleKeys || Object.keys(data[0] || []);

  const checkboxHanlder = (index) => (e) => {
    const newArr = [...checked]; // copying the old datas array
    newArr[index] = !newArr[index];

    setChecked(newArr);
  };

  console.log("Checked Array : : : ", checked);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-around",
          },
          searchBarWrapperStyle,
        ]}
      >
        <SearchInput
          placeholder={inputPlaceholder || "Enter Keyword to Search"}
          onChangeText={(value) => setSearchItem(value)}
          style={[
            { padding: 5, borderWidth: 1, borderColor: "grey", minWidth: 200 },
            searchBarStyle,
          ]}
        />
      </View>
      <ScrollView style={{ margin: 10 }}>
        {data.length && keys.length ? (
          <View style={styles.headerRow}>
            <Text style={[styles.tableVal, dataStyle]}>
              {
                <CheckBox
                  color="#0e73ca"
                  value={isSelected}
                  onValueChange={setSelected}
                  //arrow func ,toggle the value of isSelected ,iterate to checked array and make every value equals to isSelected
                  // onValueChange={selectAll}
                  // checked={isSelected}
                  // onValueChange={() => {
                  //   isSelected = !isSelected;
                  //   // console.log(checked)
                  //   for (const i in checked) {
                  //     setSelection({

                  //     })

                  //   }
                  //   console.log(checked)
                  // }}
                />
              }
            </Text>

            {keys.map((key, i) => (
              <Text
                key={i}
                style={[
                  styles.tableHead,
                  { flex: flexWidth ? flexWidth[i] : 1 },
                  titleStyle,
                ]}
              >
                {key.substring(0, 1).toUpperCase() + key.substring(1)}
              </Text>
            ))}
          </View>
        ) : null}
        {filterData.map((d, i) => {
          console.log("D : i --> ", d, "+" + " " + i);
          return (
            <TouchableOpacity key={d.id}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.tableVal, dataStyle]}>
                  {
                    <CheckBox
                      value={checked[i]}
                      onValueChange={checkboxHanlder(i)}

                      // onValueChange={() => toggleCheck(i)}
                      // checked={checked[i]}

                      /*onChange=
                      {(e) => 
                        let checked= {e.target.checked};
                        setSelection
                        (
                          isSelected.map
                          (data => 
                            {
                              if(d.id == data.id)
                              {
                                data.isSelected = true;
                              }
                                return data;
                            }
                          )
                        );
                      }*/
                    />
                  }
                </Text>
                {keys.length
                  ? keys.map((key, i) => (
                      // Remove numberOfLines and ellipsizeMode, if the content row span doesn't bother us
                      // Doesn't seem too polished for web
                      <Text
                        key={i}
                        {...props}
                        style={[
                          styles.tableVal,
                          { flex: flexWidth ? flexWidth[i] : 1 },
                          dataStyle,
                        ]}
                      >
                        {d[key]}{" "}
                      </Text>
                    ))
                  : null}
                <View
                  style={{
                    margin: 5,
                  }}
                >
                  <Text style={{ alignItems: "center" }}>
                    {
                      <Button
                        title={buttonTitle}
                        color={buttonColor}
                        onPress={buttonPress}
                      />
                    }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

SearchList.propTypes = {
  data: PropTypes.array,
  searchFields: PropTypes.array,
  visibleKeys: PropTypes.array,
  flexWidth: PropTypes.array,
  titleStyle: PropTypes.object,
  dataStyle: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  searchBarWrapperStyle: PropTypes.object,
  searchBarStyle: PropTypes.object,
  buttonTitle: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonPress: PropTypes.object,
};

const styles = StyleSheet.create({
  tableHead: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 2,
  },
  tableVal: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    padding: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
