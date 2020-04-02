import {StyleSheet} from "react-native";
import React from "react";
import {Input} from "react-native-elements";

const styles = StyleSheet.create({
    field: {
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 30,
        height: 35
    },

});

//todo make it work later
// export default function TextField({value, secureTextEntry = false, name, placeholder, onChangeText}) {
//     function onChange({value}) {
//         console.log(name);
//         if (name == 'email'){
//             onChangeText(name, value.trim());
//         }else onChangeText(name, value);
//     }
//     if (name == 'email') {
//         return (
//             <Input
//                 onChangeText={onChange}
//                 value={value}
//                 style={styles.field}
//                 placeholder={placeholder}
//                 autoCapitalize="none"
//             />
//         );
//     }
//     return (
//         <Input
//             onChangeText={onChangeText}
//             value={value}
//             style={styles.field}
//             placeholder={placeholder}
//             secureTextEntry={!!secureTextEntry}
//         />
//     );
// }

export default class TextField extends React.PureComponent {
    onChangeText = (value) => {
        // @ts-ignore
        const {onChangeText, name} = this.props;

        if (name == 'email'){
            onChangeText(name, value.trim());
        }else onChangeText(name, value);
    };

    render(): any {
        // @ts-ignore
        const { value, secureTextEntry, name, placeholder } = this.props;

        if (name == 'email') {
            return (
                <Input
                    onChangeText={this.onChangeText}
                    value={value}
                    style={styles.field}
                    placeholder={placeholder}
                    autoCapitalize="none"
                />
            );
        }


        return (
            <Input
                onChangeText={this.onChangeText}
                value={value}
                style={styles.field}
                placeholder={placeholder}
                secureTextEntry={!!secureTextEntry}
            />
        );
    }
}