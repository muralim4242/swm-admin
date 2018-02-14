import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import MapsInfo from "./MapInfo";
import Page_404 from "../ErrorPages/404";
import NoInternet from "../ErrorPages/NoInternet";
import { commonApi } from "../../../utility/api";
import _ from "lodash";
import Loader from "../Loader";
import $ from "jquery";

var appData = {
  userLocation:{
    address: null,
    latLng: { lat: 12.9226, lng: 77.6174, accuracy: 0 }
  },
  vehicleLocations:
  [
    {
      address: null,
      latLng: { lat: 12.9226, lng: 77.6174, accuracy: 0 }
    },
    {
      address: null,
      latLng: { lat: 12.9230, lng: 77.6178, accuracy: 0 }
    },
    {
      address: null,
      latLng: { lat: 12.9234, lng: 77.6182, accuracy: 0 }
    },
    {
      address: null,
      latLng: { lat: 12.9238, lng: 77.6186, accuracy: 0 }
    }
  ],
  vehicleIconUrl:
    "https://s3.amazonaws.com/locus-assets/vehicle-icons/Car1.svg",
  source: {
    address:
      "UTPL Campus, Warehouse No.1, survey no.35,38,39, IDA Block A, Mindi Village, Gajuwaka, Visakhapatnam 530012",
    latLng: { lat: 17.70080106712, lng: 83.213237792356, accuracy: 0 }
  },
  destination: {
    address:
      "6-3-1  Ramalayam Veedhi, Old Gajuwaka lbs nagar ramalayam veedhi Visakhapatnam 530026",
    latLng: { lat: 17.68660398505811, lng: 83.20296529632571, accuracy: 0 }
  },
  eta: "2016-08-21T19:58:34.272+0000",
  vehicleType: "TRUCK",
  routes: [
    {
      dumpingGround: {
        latitude: 12.9234,
        longitude: 77.634,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "Dumping ground 1",
        description: "Test dumping ground"
      },
      collectionPoints: [
        {
          latitude: 12.9226,
          longitude: 77.6174,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 1",
          description: "Test collection points"
        },
        {
          latitude: 12.9592,
          longitude: 77.6974,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 2",
          description: "Test collection points"
        },
        {
          latitude: 12.924,
          longitude: 77.6651,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 3",
          description: "Test collection points"
        }
      ]
    },
    {
      dumpingGround: {
        latitude: 12.9236,
        longitude: 77.636,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "Dumping ground 1",
        description: "Test dumping ground"
      },
      collectionPoints: [
        {
          latitude: 12.9228,
          longitude: 77.6176,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 1",
          description: "Test collection points"
        },
        {
          latitude: 12.9594,
          longitude: 77.6976,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 2",
          description: "Test collection points"
        },
        {
          latitude: 12.926,
          longitude: 77.6653,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title: "Collection point 3",
          description: "Test collection points"
        }
      ]
    }
  ]
};

var timerObject;

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidId: true,
      online: window.navigator.onLine,
      appData: {},
      refreshSeconds: 30000,
      isLoading: true,
      availWidth: window.screen.availWidth
    };
  }

  componentDidMount() {
    let uId = this.props.match.params.uid;
    let { initialize } = this;
    let { refreshSeconds } = this.state;
    let self = this;
    if (!uId) {
      this.setState({
        isValidId: false
      });
    } else {
      //Make server call to fetch initial and tracking data
      initialize();
      //And it will call every refreshSeconds
      timerObject = setInterval(() => {
        initialize();
      }, refreshSeconds);
    }

    window.addEventListener("resize", () => {
      self.setState({
        availWidth: window.screen.availWidth
      });
    });

    let updatePage = () => {
      if (self.fCon) $(self.fCon).animate({ scrollTop: 0 }, 0);
      else setTimeout(() => updatePage(), 100);
    };

    updatePage();
  }

  componentWillUnmount() {
    clearInterval(timerObject);
  }

  initialize = () => {
    let self = this;
    let { state } = self;
    commonApi(
      "get",
      "https://api.locus.sh/v1/trip/" + self.props.match.params.uid + "/info"
    )
      .then(res => {
        if (res.data && res.data.settings) {
          if (res.data.settings.title)
            window.document.title = res.data.settings.title;
          if (res.data.settings.favicon)
            $("link[rel='shortcut icon']").attr(
              "href",
              res.data.settings.favicon
            );
        }
        self.setState({
          ...state,
          isValidId: res.data && Object.keys(res.data).length,
          appData: res.data && Object.keys(res.data).length ? res.data : {},
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        // self.setState({
        //   isValidId: false,
        //   isLoading: false
        // });
      });

    self.setState({
      ...state,
      appData: appData,
      isValidId: true,
      isLoading: false
    });
  };

  render() {
    let { online, isValidId, appData, isLoading, availWidth } = this.state;
    let { initialize } = this;
    return (
      <div>
        {online ? isValidId ? isLoading ? (
          <Loader />
        ) : (
          <div
            ref={ref => (this.fCon = ref)}
            className="flex-container"
            style={{ overflowY: availWidth >= 767 ? "hidden" : "auto" }}
          >
            <MapsInfo
              {...appData}
              refresh={initialize}
              availWidth={availWidth}
            />
          </div>
        ) : (
          <Page_404 availWidth={availWidth} />
        ) : (
          <NoInternet availWidth={availWidth} />
        )}
      </div>
    );
  }
}

export default translate("translations")(Tracker);
