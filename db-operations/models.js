const mongoose = require('mongoose')

const { model, Schema } = mongoose

//BridegPort
const BridgePortschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'Down Discard Byte': Schema.Types.String,
      'Down Discard Frame': Schema.Types.String,
      'Down Foward Byte': Schema.Types.String,
      'Down Foward Frame': Schema.Types.String,
      'Time Measured': Schema.Types.String,
      'Up Discard Byte': Schema.Types.String,
      'Up Discard Frame': Schema.Types.String,
      'Up Foward Byte': Schema.Types.String,
      'Up Foward Frame': Schema.Types.String,
      timestamp: Schema.Types.Date,

      olt: Schema.Types.String,
      type: Schema.Types.String,
    },
  ],
})

//OntAggGem
const OntAggGemschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'Recieve Blocks': Schema.Types.String,
      'Receive Frags': Schema.Types.String,
      'Transmit Blocks': Schema.Types.String,
      'Transmit Frags': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
    },
  ],
})

//vlanPort
const vlanPortschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'Down Discard Byte': Schema.Types.String,
      'Down Discard Frame': Schema.Types.String,
      'Down Foward Byte': Schema.Types.String,
      'Down Foward Frame': Schema.Types.String,
      'Up Discard Byte': Schema.Types.String,
      'Up Discard Frame': Schema.Types.String,
      'Up Foward Byte': Schema.Types.String,
      'Up Foward Frame': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
      vlan: Schema.Types.String,

      type: Schema.Types.String,
    },
  ],
})

//cpu usage
const CpuUsageschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'memory Absolute Usage': Schema.Types.String,
      'operation Status': Schema.Types.String,
      'start Monitor Time': Schema.Types.Date,

      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
    },
  ],
})

//Ethernet Lines SLOT

const EthernetLinesSLotschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'interface Ingress Discards': Schema.Types.String,
      'interface NU cast Packets': Schema.Types.String,
      'interface Ingress Octets': Schema.Types.String,
      'interface Outgress Discards': Schema.Types.String,

      'interface Outgress NU cast Packets': Schema.Types.String,
      'Interface Outgress Octets': Schema.Types.String,
      'interface Administration Status': Schema.Types.String,
      'interface High Speed': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
    },
  ],
})
//Ethernet Port
const EthernetPortschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      tmnxPortAdminStatus: Schema.Types.String,
      'interface HC Ingress Octetes': Schema.Types.String,
      'interface HC Outgress Octetes': Schema.Types.String,
      'interface ingress Discards': Schema.Types.String,
      'interface outgress Discards': Schema.Types.String,
      'tmnx Port Admin Status': Schema.Types.String,
      'tmnx Port Ether operat Status': Schema.Types.String,
      'tmnx Port Ether Speed': Schema.Types.String,
      'tmnx Port Link Status': Schema.Types.String,
      'tmnx Port operat Status': Schema.Types.String,
      timestamp: Schema.Types.Date,

      olt: Schema.Types.String,
    },
  ],
})

//ISAM_ONT
const Ontschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'interface Administration Status': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
    },
  ],
})

//OntEthPort
const OntEthPortschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'interface Administration Status': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
      type: Schema.Types.String,
    },
  ],
})

//OntVeipPort

const OntVeipPortschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'interface Administration Status': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,

      type: Schema.Types.String,
    },
  ],
})

//Pon

const Ponschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'interface Administration Status': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,
    },
  ],
})

//Uni
const Unischema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'Down Discard Byte': Schema.Types.String,
      'Down Foward Byte': Schema.Types.String,
      'Up Discard Byte': Schema.Types.String,
      'Up Foward Byte': Schema.Types.String,
      'interface Operation Status': Schema.Types.String,
      timestamp: Schema.Types.Date,
      olt: Schema.Types.String,

      type: Schema.Types.String,
    },
  ],
})

//VlanPortAssociation

const VlanPortAssociationschema = new Schema({
  ObjectID: {
    type: Schema.Types.String,
  },
  data: [
    {
      'Down Discard Byte': Schema.Types.String,
      'Down Foward Byte': Schema.Types.String,

      'Up Discard Byte': Schema.Types.String,

      'Up Foward Byte': Schema.Types.String,

      timestamp: Schema.Types.Date,

      olt: Schema.Types.String,
      vlan: Schema.Types.String,
      type: Schema.Types.String,
    },
  ],
})

//
module.exports = {
  BridgePortschema,
  OntAggGemschema,
  vlanPortschema,
  CpuUsageschema,
  EthernetLinesSLotschema,
  EthernetPortschema,
  OntEthPortschema,
  Ontschema,
  OntVeipPortschema,
  Ponschema,
  Unischema,
  VlanPortAssociationschema,
}
