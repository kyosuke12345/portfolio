import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CryptocurrencyMasterItemResponse } from "api/response/cryptocurrencyMasterList.response";
import { CryptocurrencyMasterState } from "redux/modules/cryptocurrencyMasterModule";
import { Field, WrappedFieldArrayProps } from "redux-form";
import { isUndefined } from "utils/typeguard";
import WrapperTextField from "components/input/text";
import { isNumeric, minValue, maxValue, lt, mt } from "utils/validator";

const minValue0 = minValue(0);
const maxValue1oku = maxValue(100000000);

export type CryptocurrencyMasterTableProps = {
  listResponse?: CryptocurrencyMasterState["response"];
};

type cryptocurrencyMsterRowProps = CryptocurrencyMasterItemResponse;

const renderCryptocurrencies: React.VFC = (
  props: WrappedFieldArrayProps<cryptocurrencyMsterRowProps>
) => {
  const { fields } = props;
  return (
    <>
      {fields.map((v, index) => (
        <TableRow>
          <TableCell>
            <Field
              // TODO checkubox追加
              name={`${v}.min`}
              component={WrapperTextField}
              validate={[isNumeric, minValue0, maxValue1oku]}
            />
          </TableCell>
          <TableCell>{fields.get(index).name}</TableCell>
          <TableCell>{fields.get(index).type}</TableCell>
          <TableCell>
            <Field
              name={`${v}.min`}
              component={WrapperTextField}
              validate={[isNumeric, minValue0, maxValue1oku]}
            />
          </TableCell>
          <TableCell>
            <Field
              name={`${v}.max`}
              component={WrapperTextField}
              validate={[isNumeric, minValue0, maxValue1oku]}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const CryptocurrencyMasterTable: React.VFC<CryptocurrencyMasterTableProps> = ({
  response,
}) => {
  if (isUndefined(response)) {
    return <></>;
  } else {
    <Box sx={{ mb: 1 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>type</TableCell>
              <TableCell>閾値(min)</TableCell>
              <TableCell>閾値(max)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.plainPassword}</TableCell>
                <TableCell>{item.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>;
  }
};

export default CryptocurrencyMasterTable;
