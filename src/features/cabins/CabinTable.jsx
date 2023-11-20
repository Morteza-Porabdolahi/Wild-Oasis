import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from '../../ui/Table';

import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";

const CabinTable = () => {
  const [isLoading, error, cabins] = useCabins();

  if (isLoading) return <Spinner />;

  return (
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={cabin => (
        <Menus>
          <CabinRow key={cabin.id} cabin={cabin} />
        </Menus>
        )} />
      </Table>
  )
}

export default CabinTable
