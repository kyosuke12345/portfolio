import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  CryptocurrencyMasterItemResponse,
  CryptocurrencyMasterListResponse,
} from "api/response/cryptocurrencyMasterList.response";
import { CryptocurrencyMasterState } from "redux/modules/cryptocurrencyMasterModule";
import {
  Field,
  FieldArray,
  Form,
  InjectedFormProps,
  WrappedFieldArrayProps,
} from "redux-form";
import { isUndefined } from "utils/typeguard";
import WrapperTextField from "components/input/text";
import { isNumeric, minValue, maxValue, lt, mt } from "utils/validator";

const minValue0 = minValue(0);
const maxValue1oku = maxValue(100000000);

export type CryptocurrencyMasterTableProps = {
  items?: CryptocurrencyMasterListResponse["items"];
};

// type cryptocurrencyMsterRowProps = CryptocurrencyMasterItemResponse;

// const renderCryptocurrencies: React.VFC<
//   WrappedFieldArrayProps<cryptocurrencyMsterRowProps>
// > = (props) => {
//   const { fields } = props;
//   return (
//     <>
//       {fields.map((v, index) => (
//         <TableRow>
//           <TableCell>
//             <Field
//               name={`${v}.min`}
//               component={WrapperTextField}
//               validate={[isNumeric, minValue0, maxValue1oku]}
//             />
//           </TableCell>
//           <TableCell>{fields.get(index).name}</TableCell>
//           <TableCell>{fields.get(index).type}</TableCell>
//           <TableCell>
//             <Field
//               name={`${v}.min`}
//               component={WrapperTextField}
//               validate={[isNumeric, minValue0, maxValue1oku]}
//             />
//           </TableCell>
//           <TableCell>
//             <Field
//               name={`${v}.max`}
//               component={WrapperTextField}
//               validate={[isNumeric, minValue0, maxValue1oku]}
//             />
//           </TableCell>
//         </TableRow>
//       ))}
//     </>
//   );
// };

// type InjectedCryptocurrencyMasterTableFormProps = InjectedFormProps<
//   {},
//   CryptocurrencyMasterTableProps
// > &
//   CryptocurrencyMasterTableProps;

const CryptocurrencyMasterTable: React.VFC<CryptocurrencyMasterTableProps> = ({
  items,
}) => {
  if (isUndefined(items)) {
    return <></>;
  } else {
    return (
      <Box sx={{ mb: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>name</TableCell>
                <TableCell>type</TableCell>
                <TableCell>閾値(min)</TableCell>
                <TableCell>閾値(max)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((v, index) => (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>{v.minThreshold}</TableCell>
                  <TableCell>{v.maxThreshold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};

export default CryptocurrencyMasterTable;
