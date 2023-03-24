import React from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Component } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import MyChart from '../MyChart/MyChart';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';

import './Screen1.css'

const data = [
   { year: 2020, equity: 100 },
   { year: 2021, equity: 120 },
   { year: 2022, equity: 150 },
   { year: 2023, equity: 180 },
 ];

 const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
   props,
   ref,
 ) {
   const { onChange, ...other } = props;
 
   return (
     <NumericFormat
       {...other}
       getInputRef={ref}
       onValueChange={(values) => {
         onChange({
           target: {
             name: props.name,
             value: values.value,
           },
         });
       }}
       thousandSeparator
       valueIsNumericString
       prefix="$"
     />
   );
 });

const currencyFormatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
});

const usdPrice = {
   type: 'number',
   valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
};

// const rows = [
//    {id: 1, name: "aaa", yealdCurve: 55, price: 100},
//    {id: 2, name: "bbb", yealdCurve: 55, price: 100},
//    {id: 3, name: "ccc", yealdCurve: 55, price: 100},
// ]

// const columns = [
//    { field: 'name', headerName: 'Name', width: 120 },
//    { field: 'coupon_rate', headerName: 'Coupon Rate', width: 120, ...usdPrice },
//    { field: 'price', headerName: 'price', width: 120, ...usdPrice },
// ]

class Screen1 extends Component {
   constructor(props) {
     super(props);
     this.state = {
      date: "",
      amount: "",
      bondData: {},
      checkedBondId: -1,
      bonds: [],
      payments: [],
      buttonPressed: false
     }
     this.handleChangeAmount = this.handleChangeAmount.bind(this);
     this.handleChangeDate = this.handleChangeDate.bind(this);
     this.onCheckboxClick = this.onCheckboxClick.bind(this);
   }

   handleChangeAmount(event) {
      this.setState({amount: event.target.value});
      console.log(this.state.amount)
   }

   handleChangeDate(event) {
      // this.setState({date: event.target.value});
      // this.setState({date: dayjs(event)});
      // this.setState({date: new Date(event).toLocaleDateString('de-DE')});
      this.setState({date: event});
      console.log(new Date(event).toLocaleDateString('de-DE'))
   }

   onCheckboxClick(id) {
      this.setState({checkedBondId: id});
      console.log(id)
   }

   isFirstButtonDisabled() {
      return this.state.date === "" || !this.state.amount == "";
   }

   formatDate() {
      //const dateString = new Date(this.state.date).toLocaleDateString('de-DE'); // create a new Date object with the current date and time
      // let year = date.getFullYear(); // get the year (YYYY)
      // console.log(year);
      // let month = String(date.getMonth() + 1).padStart(2, '0'); // get the month (MM) and pad with leading zero if necessary
      // let day = String(date.getDate()).padStart(2, '0'); // get the day (DD) and pad with leading zero if necessary
      // let formattedDate = year + '-' + month + '-' + day; // concatenate the year, month, and day in the desired format
      // console.log(formattedDate); // output: "2023-03-23"
      // return formattedDate
      //console.log(dayjs(this.state.date).format("%Y-%m-%d"));
      //const date = new Date(dateString);
      // console.log(date);
      // date.setHours(0, 0, 0);
      //const res = date.toISOString().split('T')[0];
      const res = new Date(this.state.date).toLocaleDateString('de-DE')
      console.log(res);
      return res;
   }

   sendGetRequest () {
      const url = 'http://3.70.170.119:8080/get/bonds?finish_date=' + this.formatDate() + '&value=' + this.state.amount;
      fetch(url,
        {
            // headers: {'User-Agent': 'request'}
            headers: {}
        }
      ).then((response) => response.json())
      .then((result) => {
         console.log(result);
         const res = []
         const dateToPaymentsMap = new Map();
         result.forEach((bond, index) => {
            // console.log(index);
           res.push({
            id: index,
            name: bond.name,
            yealdCurve: bond.coupon_rate,
            price: bond.current_price,
            final_maturity_date: bond.final_maturity_date,
            payments: bond.payments
           })
           bond.payments.forEach((payment, index_p) => {
            if (!dateToPaymentsMap.has(payment.date)) {
               dateToPaymentsMap.set(payment.date, {
                  bond1return: null,
                  bond2return: null,
                  bond3return: null,
               })
            }
            const i = index + 1
            console.log(bond.payments.length);
            let rt = payment.return
            if (index_p === bond.payments.length - 1) {
               // console.log("here");
               // console.log(bond.current_price);
               rt = payment.return - bond.current_price;
               // console.log(rt);
            }
            dateToPaymentsMap.get(payment.date)["bond"+i+"return"] = rt
           })
         });
         // dateToPaymentsMap.set(this.state.date, {
         //    bond1return: 0,
         //    bond2return: 0,
         //    bond3return: 0,
         // })
         // console.log(dateToPaymentsMap);
         const payments = [];
         dateToPaymentsMap.forEach((value, key) => {
            payments.push({
               date: new Date(key),
               bond1return: value.bond1return,
               bond2return: value.bond2return,
               bond3return: value.bond3return,
            })
         })
         payments.push({
            date: new Date(),
            bond1return: 0,
            bond2return: 0,
            bond3return: 0,
         })
         payments.sort((a,b) => a.date - b.date);
         payments.map((v) => {v.date = v.date.toLocaleDateString()})
         console.log(payments);
         this.setState({bonds: res, payments: payments, buttonPressed: true});
      })
   }

   render() {
      return (
         <div className="main">
            <form className="form-style">
	       <div className="row"><h1>Two clicks to passive income</h1></div>
               <div className="inputs">
                  <FormControl sx={{ m: 1, width: '50%' }}>
                     {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
                     <TextField
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                        InputProps={{
                           inputComponent: NumericFormatCustom,
                         }}
                     />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1, width: '50%' }}>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        disablePast
                        // format="YYYY-MM-DD"
                        value={this.state.date}
                        // onChange={this.handleChangeDate}
                        onChange={(newValue) => {
                           this.handleChangeDate(newValue);
                        }}
                        />
                     </LocalizationProvider>
                  </FormControl>
               </div>
               <div className="submit-button">
                  <Button 
                  disabled = {!this.state.amount || !this.state.date || this.state.amount < 100}
                  variant="contained" 
                  onClick={() => this.sendGetRequest()}
                  fullWidth="true">Get Bonds</Button>
               </div>
            </form>
            <div className={`results ${
               this.state.buttonPressed ? 'visible' : 'invisible'
            }`}>
               <div className="row"><h1>Payoff plots</h1></div>
               <div className="chart-container">
                     <div className="chart">
                        <MyChart chartData={this.state.payments} />
                     </div>
               </div>
               <div className="bond-table">
                  <TableContainer style={{color: 'white',}}>
                     <Table size="small" aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell padding="checkbox"></TableCell>
                           <TableCell>Bond Name</TableCell>
                           <TableCell align="right">Coupon Rate</TableCell>
                           <TableCell align="right">Price</TableCell>
                           <TableCell align="right">Maturity Date</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {this.state.bonds.map((row) => (
                           <TableRow
                           key={row.id}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           >
                              <TableCell padding="checkbox">
                                 <Checkbox
                                 color="primary"
                                 // onClick={this.onCheckboxClick(row.id)}
                                 checked={this.state.checkedBondId === row.id}
                                 // inputProps={{
                                 //    'aria-labelledby': labelId,
                                 // }}[]
                                 onChange={() => this.onCheckboxClick(row.id)}
                                 />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                 {row.name}
                              </TableCell>
                              <TableCell align="right">{row.yealdCurve}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">{row.final_maturity_date}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                     </Table>
                  </TableContainer>
                  {/* <DataGrid
                     columns={columns}
                     rows={rows}
                  /> */}
               </div>
               
               <div className="buy-button">
                  <Button 
                  disabled={this.state.checkedBondId === -1}
                  variant="contained" 
                  fullWidth="true">Buy bond</Button>
               </div>
            </div>
            
         </div>
      )
   }
}

export default Screen1;
