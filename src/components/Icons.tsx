import { CgClose } from 'react-icons/cg';
import { FaAnchor, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import { FiArrowLeft, FiClock, FiDownload, FiMail, FiMenu, FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineUsers } from 'react-icons/hi';
import { IoMdCalendar, IoMdHeartEmpty } from 'react-icons/io';
import { IoLocationOutline, IoPersonOutline, IoSearch, IoFilter } from 'react-icons/io5';
import { LiaBalanceScaleSolid } from 'react-icons/lia';
import { PiMapTrifoldBold } from 'react-icons/pi';
import {
  MdDone,
  MdExitToApp,
  MdKeyboardArrowDown,
  MdLocationOn,
  MdOutlineEdit,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdOutlineLocalPhone,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdUnfoldMore,
} from 'react-icons/md';
import { PiArrowBendDownLeftBold, PiHouseLineLight } from 'react-icons/pi';
import { IconName } from '../utils';
import { IconBaseProps } from 'react-icons/lib';

export interface IconProps extends IconBaseProps {
  name: IconName | string;
  className?: string;
}

const Icon = ({ name, className, ...rest }: IconProps) => {
  switch (name) {
    case IconName.book:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case IconName.airBallon:
      return (
        <svg
          width="142"
          height="142"
          viewBox="0 0 142 142"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2_88)">
            <path
              d="M9.75916 68.7638C10.7645 61.174 16.0643 54.9207 23.3587 52.6767C22.8598 50.1856 22.5858 47.6992 22.5858 45.2303C22.5858 20.2902 44.5148 0 71.469 0C79.3045 0 86.7897 1.66379 93.7172 4.94504C100.339 8.08152 106.198 12.6619 110.66 18.1904C111.382 19.0843 111.241 20.3939 110.348 21.1156C109.454 21.8372 108.144 21.6972 107.422 20.8033C103.351 15.7587 97.9961 11.5752 91.9361 8.70471C89.5651 7.58175 87.1217 6.6654 84.6165 5.95707C90.4121 11.6315 94.8418 20.9891 96.7766 32.4007C100.569 28.4011 105.866 26.0639 111.569 26.0639C121.95 26.0639 130.511 33.7256 131.811 43.8211C137.313 44.7331 141.522 49.5247 141.522 55.281C141.522 61.686 136.311 66.897 129.906 66.897H94.004C91.6432 74.342 88.56 81.5177 85.5725 88.4713C84.1469 91.7889 82.7868 94.9617 81.5826 97.9875H83.8438C87.092 97.9875 90.1827 96.4252 92.1119 93.8079C97.235 86.8616 102.434 79.8683 106.828 72.499C107.417 71.5123 108.693 71.1891 109.68 71.7777C110.667 72.3662 110.99 73.6428 110.402 74.6296C105.977 82.0502 100.641 89.2525 95.5887 96.1029L86.8244 115.271H88.3562C90.8775 115.271 92.9287 117.323 92.9287 119.844V122.21C92.9287 124.579 91.1182 126.532 88.8085 126.76L86.0903 136.997C85.3082 139.943 82.6334 142 79.5854 142H63.3533C60.3053 142 57.6304 139.943 56.8485 136.997L54.1303 126.76C51.8206 126.532 50.0101 124.579 50.0101 122.21V119.844C50.0101 117.323 52.0613 115.271 54.5826 115.271H56.1737L47.352 96.1054C46.0321 94.3155 44.7929 92.6378 43.5771 90.9715H11.6629C5.49583 90.9715 0.478409 85.9541 0.478409 79.7868C0.477859 74.2679 4.49545 69.6699 9.75916 68.7638ZM137.362 55.281C137.362 51.1763 134.028 47.8357 129.926 47.8252C129.912 47.8254 129.899 47.8254 129.888 47.8254C128.771 47.8254 127.853 46.9435 127.809 45.8274C127.464 37.0778 120.331 30.2241 111.57 30.2241C105.429 30.2241 99.8781 33.6279 97.0831 39.1077C96.7369 39.7861 96.0477 40.2212 95.2862 40.2417C91.0101 40.3571 87.2238 42.8369 85.4047 46.7136C85.0197 47.5342 84.1478 48.0107 83.2486 47.892C80.9258 47.5844 78.6441 48.3557 76.9912 50.0087C72.2761 54.7238 75.6763 62.7671 82.3176 62.7346C82.3525 62.7343 82.3888 62.7352 82.4243 62.7365H129.906C134.017 62.7368 137.362 59.3921 137.362 55.281ZM60.8689 135.93C61.1673 137.054 62.1888 137.84 63.3528 137.84H79.5849C80.7489 137.84 81.7701 137.054 82.0688 135.929L84.4975 126.782H58.4399L60.8689 135.93ZM54.1697 119.844V122.21C54.1697 122.437 54.3547 122.622 54.5821 122.622H88.3559C88.5833 122.622 88.7683 122.437 88.7683 122.21V119.844C88.7683 119.616 88.5833 119.431 88.3559 119.431H54.5823C54.3546 119.431 54.1697 119.616 54.1697 119.844ZM82.2499 115.271L88.6285 101.32C87.1062 101.858 85.4901 102.147 83.8438 102.147H59.0942C57.457 102.147 55.8501 101.86 54.3352 101.329L60.7527 115.271H82.2499ZM50.826 93.8076C52.7549 96.4247 55.8459 97.9869 59.0942 97.9869H61.3554C60.1509 94.9608 58.7908 91.7875 57.3647 88.4696C51.6145 75.0878 45.0969 59.9204 45.0969 45.2303C45.0969 40.336 45.5434 35.5238 46.424 30.9283C46.6403 29.8 47.7297 29.0604 48.8583 29.2767C49.9865 29.493 50.7259 30.5827 50.5098 31.7112C49.6784 36.0494 49.2568 40.5979 49.2568 45.2303C49.2568 59.0642 55.5949 73.8139 61.187 86.8272C62.8652 90.733 64.4611 94.4464 65.8281 97.9869H77.1099C78.4769 94.4469 80.0725 90.7336 81.7504 86.8286C84.5269 80.367 87.3857 73.7105 89.6308 66.8967H82.3323C82.3034 66.8967 82.2748 66.8961 82.2463 66.895C71.9596 66.8826 66.7566 54.3602 74.0497 47.0669C76.2726 44.8443 79.213 43.6337 82.3134 43.6647C84.6514 39.6818 88.6058 36.9935 93.1403 36.2732C90.8783 17.8443 81.7315 4.16016 71.469 4.16016C64.1363 4.16016 57.254 10.9817 53.0592 22.4077C52.6629 23.4863 51.4672 24.0393 50.3895 23.6436C49.3109 23.2475 48.7579 22.0524 49.1539 20.9741C51.4714 14.6618 54.6032 9.57585 58.2463 5.99312C40.0207 11.1831 26.7459 26.8097 26.7459 45.2303C26.7459 61.7786 40.8391 80.2666 50.826 93.8076ZM11.6626 86.8111H40.5784C33.9294 77.4419 27.401 67.1022 24.3596 56.7221C18.2819 58.6959 14.0169 64.2278 13.7587 70.7645C13.7146 71.8806 12.7972 72.7625 11.6803 72.7625C11.6689 72.7625 11.6556 72.7625 11.642 72.7622C7.77782 72.7731 4.63802 75.9201 4.63802 79.7868C4.63802 83.6599 7.78918 86.8111 11.6626 86.8111Z"
              fill="#E4E7E4"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_88">
              <rect width="142" height="142" fill="white" transform="matrix(-1 0 0 1 142 0)" />
            </clipPath>
          </defs>
        </svg>
      );
    case IconName.openInNew:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      );
    case IconName.list:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      );
    case IconName.sidebarLogo:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="183"
          height="36.687"
          viewBox="0 0 283 36.687"
        >
          <g id="Logo_dark" transform="translate(-272.715 -164)">
            <g id="Group_7461" data-name="Group 7461" transform="translate(272.715 172.715)">
              <path
                id="Path_3631"
                data-name="Path 3631"
                d="M61.533,224h16.6a5.533,5.533,0,1,1,0,11.067h-16.6a5.533,5.533,0,1,1,0-11.067"
                transform="translate(-56 -207.399)"
                fill="#73dc8c"
              />
              <path
                id="Path_3632"
                data-name="Path 3632"
                d="M229.533,56h0A5.533,5.533,0,1,1,224,61.533,5.533,5.533,0,0,1,229.533,56"
                transform="translate(-207.4 -56)"
                fill="#73dc8c"
              />
            </g>
            <g id="Group_7462" data-name="Group 7462" transform="translate(313.526 164)">
              <path
                id="Path_3633"
                data-name="Path 3633"
                d="M539.286,134.941a7.091,7.091,0,0,1-2.872,6q-2.872,2.166-8.466,2.167a23.949,23.949,0,0,1-3.931-.3,11.259,11.259,0,0,1-3.1-.932,5.537,5.537,0,0,1-2.016-1.587,3.627,3.627,0,0,1-.731-2.268,3.869,3.869,0,0,1,.5-2.041,5.092,5.092,0,0,1,1.21-1.386,20.039,20.039,0,0,0,3.351,1.436,13.761,13.761,0,0,0,4.359.63,5.092,5.092,0,0,0,2.394-.454,1.359,1.359,0,0,0,.831-1.209,1.266,1.266,0,0,0-.6-1.109,5.623,5.623,0,0,0-2.016-.655l-1.512-.3a14.142,14.142,0,0,1-6.526-2.7,6.559,6.559,0,0,1-2.142-5.266,6.956,6.956,0,0,1,3.074-5.9,11.38,11.38,0,0,1,3.5-1.562,17.2,17.2,0,0,1,4.51-.554,21.059,21.059,0,0,1,3.5.277,11.434,11.434,0,0,1,2.847.831,5.151,5.151,0,0,1,1.915,1.436,3.248,3.248,0,0,1,.706,2.091,4.3,4.3,0,0,1-.428,1.99,4.483,4.483,0,0,1-1.083,1.386,6.237,6.237,0,0,0-1.209-.529q-.807-.276-1.764-.5t-1.94-.378a11.86,11.86,0,0,0-1.789-.151,6.911,6.911,0,0,0-2.57.378,1.253,1.253,0,0,0-.907,1.184,1.064,1.064,0,0,0,.5.907,5.773,5.773,0,0,0,1.915.655l1.562.353q4.838,1.109,6.879,3.049a6.61,6.61,0,0,1,2.041,5.014"
                transform="translate(-518.02 -106.418)"
                fill="#002025"
              />
              <path
                id="Path_3634"
                data-name="Path 3634"
                d="M786.8,117.46a14.465,14.465,0,0,1,4.057.58,9.989,9.989,0,0,1,3.452,1.739,14.918,14.918,0,0,1,3.4-1.663,14.006,14.006,0,0,1,4.561-.655,14.169,14.169,0,0,1,3.754.5,9.6,9.6,0,0,1,3.276,1.587,7.684,7.684,0,0,1,2.293,2.872,10.041,10.041,0,0,1,.857,4.359v15.874a11.713,11.713,0,0,1-1.588.3,16.222,16.222,0,0,1-2.242.151,11.845,11.845,0,0,1-1.99-.151,3.388,3.388,0,0,1-1.487-.6,2.9,2.9,0,0,1-.932-1.235,5.332,5.332,0,0,1-.327-2.041V127.035a2.633,2.633,0,0,0-.857-2.192,3.628,3.628,0,0,0-2.318-.68,4.032,4.032,0,0,0-1.512.328,4.366,4.366,0,0,0-1.209.68,1.6,1.6,0,0,1,.05.378v17.109a14.134,14.134,0,0,1-1.638.3,15.858,15.858,0,0,1-2.192.151,11.848,11.848,0,0,1-1.991-.151,3.388,3.388,0,0,1-1.487-.6,2.9,2.9,0,0,1-.932-1.235,5.331,5.331,0,0,1-.328-2.041V127.035a2.531,2.531,0,0,0-.932-2.192,3.7,3.7,0,0,0-2.243-.68,4,4,0,0,0-1.562.277,11.818,11.818,0,0,0-1.109.529v17.688a11.7,11.7,0,0,1-1.587.3,16.231,16.231,0,0,1-2.243.151,11.845,11.845,0,0,1-1.99-.151,3.389,3.389,0,0,1-1.487-.6,2.9,2.9,0,0,1-.932-1.235,5.336,5.336,0,0,1-.328-2.041V123.86a3.64,3.64,0,0,1,.58-2.167,6.547,6.547,0,0,1,1.588-1.512,14.5,14.5,0,0,1,4.258-1.965,18.576,18.576,0,0,1,5.317-.756"
                transform="translate(-749.657 -106.878)"
                fill="#002025"
              />
              <path
                id="Path_3635"
                data-name="Path 3635"
                d="M1205.56,117.46a20.7,20.7,0,0,1,4.964.554,11.118,11.118,0,0,1,3.83,1.688,7.622,7.622,0,0,1,2.444,2.872,9.2,9.2,0,0,1,.856,4.107V137.97a3.127,3.127,0,0,1-.73,2.142,7.289,7.289,0,0,1-1.739,1.436q-3.276,1.965-9.222,1.965a21.091,21.091,0,0,1-4.813-.5,11.4,11.4,0,0,1-3.679-1.512,6.928,6.928,0,0,1-2.368-2.57,7.6,7.6,0,0,1-.832-3.628,6.824,6.824,0,0,1,2.066-5.342q2.066-1.864,6.4-2.318l6.6-.706v-.353a2.161,2.161,0,0,0-1.285-2.091,8.655,8.655,0,0,0-3.7-.63,17.153,17.153,0,0,0-3.729.4,19.861,19.861,0,0,0-3.276,1.008,3.484,3.484,0,0,1-1.109-1.386,4.38,4.38,0,0,1-.454-1.94,3.232,3.232,0,0,1,.63-2.091,4.878,4.878,0,0,1,1.94-1.335,15.181,15.181,0,0,1,3.452-.806,30.012,30.012,0,0,1,3.754-.252m.4,19.8a11.26,11.26,0,0,0,1.89-.176,4.609,4.609,0,0,0,1.537-.479v-4.031l-3.628.3a5.592,5.592,0,0,0-2.318.6,1.629,1.629,0,0,0-.907,1.512,2,2,0,0,0,.781,1.638,4.272,4.272,0,0,0,2.646.63"
                transform="translate(-1127.452 -106.878)"
                fill="#002025"
              />
              <path
                id="Path_3636"
                data-name="Path 3636"
                d="M1494.044,69.12q-.555.1-1.638.277a13.665,13.665,0,0,1-2.192.176,11.848,11.848,0,0,1-1.991-.151,3.387,3.387,0,0,1-1.486-.6,2.9,2.9,0,0,1-.933-1.235,5.336,5.336,0,0,1-.327-2.041V36.314q.554-.1,1.638-.277a13.653,13.653,0,0,1,2.192-.176,11.86,11.86,0,0,1,1.99.151,3.394,3.394,0,0,1,1.487.6,2.913,2.913,0,0,1,.932,1.235,5.352,5.352,0,0,1,.328,2.041Z"
                transform="translate(-1389.883 -33.341)"
                fill="#002025"
              />
              <path
                id="Path_3637"
                data-name="Path 3637"
                d="M1641.892,134.941a7.091,7.091,0,0,1-2.872,6q-2.873,2.166-8.466,2.167a23.951,23.951,0,0,1-3.931-.3,11.262,11.262,0,0,1-3.1-.932,5.542,5.542,0,0,1-2.016-1.587,3.627,3.627,0,0,1-.73-2.268,3.866,3.866,0,0,1,.5-2.041,5.1,5.1,0,0,1,1.209-1.386,20.048,20.048,0,0,0,3.351,1.436,13.761,13.761,0,0,0,4.359.63,5.093,5.093,0,0,0,2.394-.454,1.359,1.359,0,0,0,.831-1.209,1.265,1.265,0,0,0-.6-1.109,5.62,5.62,0,0,0-2.016-.655l-1.511-.3a14.143,14.143,0,0,1-6.526-2.7,6.559,6.559,0,0,1-2.142-5.266,6.955,6.955,0,0,1,3.074-5.9,11.383,11.383,0,0,1,3.5-1.562,17.2,17.2,0,0,1,4.51-.554,21.058,21.058,0,0,1,3.5.277,11.434,11.434,0,0,1,2.847.831,5.153,5.153,0,0,1,1.915,1.436,3.248,3.248,0,0,1,.706,2.091,4.3,4.3,0,0,1-.428,1.99,4.477,4.477,0,0,1-1.083,1.386,6.235,6.235,0,0,0-1.209-.529q-.807-.276-1.764-.5t-1.94-.378a11.86,11.86,0,0,0-1.789-.151,6.911,6.911,0,0,0-2.57.378,1.253,1.253,0,0,0-.907,1.184,1.064,1.064,0,0,0,.5.907,5.772,5.772,0,0,0,1.915.655l1.562.353q4.838,1.109,6.879,3.049a6.609,6.609,0,0,1,2.041,5.014"
                transform="translate(-1511.677 -106.418)"
                fill="#002025"
              />
              <path
                id="Path_3638"
                data-name="Path 3638"
                d="M1877.66,124.544a11.656,11.656,0,0,1,1.587-.3,16.214,16.214,0,0,1,2.243-.151,11.861,11.861,0,0,1,1.99.151,3.393,3.393,0,0,1,1.487.6,2.916,2.916,0,0,1,.932,1.235,5.352,5.352,0,0,1,.327,2.041v10.835a3.741,3.741,0,0,0,1.008,2.948,4.308,4.308,0,0,0,2.923.882,7.287,7.287,0,0,0,1.89-.2,6.479,6.479,0,0,0,1.134-.4V124.544a11.64,11.64,0,0,1,1.587-.3,16.208,16.208,0,0,1,2.242-.151,11.861,11.861,0,0,1,1.99.151,3.393,3.393,0,0,1,1.487.6,2.914,2.914,0,0,1,.932,1.235,5.352,5.352,0,0,1,.328,2.041v15.32a4.117,4.117,0,0,1-2.117,3.78,13.856,13.856,0,0,1-4.208,1.688,23.061,23.061,0,0,1-5.317.58,19.624,19.624,0,0,1-5.014-.6,11.188,11.188,0,0,1-3.956-1.865,8.326,8.326,0,0,1-2.57-3.25,11.55,11.55,0,0,1-.907-4.813Z"
                transform="translate(-1743.313 -112.852)"
                fill="#002025"
              />
              <path
                id="Path_3639"
                data-name="Path 3639"
                d="M2190.169,130.462a15.186,15.186,0,0,1-.958,5.568,11.284,11.284,0,0,1-2.7,4.107,11.46,11.46,0,0,1-4.158,2.52,16.074,16.074,0,0,1-5.392.857,15.256,15.256,0,0,1-5.392-.907,11.857,11.857,0,0,1-4.158-2.6,11.576,11.576,0,0,1-2.7-4.107,15.807,15.807,0,0,1,0-10.835,11.583,11.583,0,0,1,2.7-4.107,11.87,11.87,0,0,1,4.158-2.6,15.252,15.252,0,0,1,5.392-.907,14.892,14.892,0,0,1,5.392.932,12.18,12.18,0,0,1,4.158,2.621,11.583,11.583,0,0,1,2.7,4.107,14.409,14.409,0,0,1,.958,5.342m-17.638,0a7.964,7.964,0,0,0,1.184,4.712,3.843,3.843,0,0,0,3.3,1.638,3.7,3.7,0,0,0,3.25-1.663,8.26,8.26,0,0,0,1.134-4.687,8,8,0,0,0-1.159-4.662,4.094,4.094,0,0,0-6.551,0,7.989,7.989,0,0,0-1.16,4.662"
                transform="translate(-2001.145 -106.878)"
                fill="#002025"
              />
              <path
                id="Path_3640"
                data-name="Path 3640"
                d="M2483.429,69.12q-.556.1-1.638.277a13.663,13.663,0,0,1-2.192.176,11.85,11.85,0,0,1-1.991-.151,3.391,3.391,0,0,1-1.487-.6,2.9,2.9,0,0,1-.932-1.235,5.326,5.326,0,0,1-.328-2.041V36.314q.553-.1,1.637-.277a13.65,13.65,0,0,1,2.192-.176,11.863,11.863,0,0,1,1.991.151,3.394,3.394,0,0,1,1.487.6,2.914,2.914,0,0,1,.932,1.235,5.352,5.352,0,0,1,.328,2.041Z"
                transform="translate(-2281.504 -33.341)"
                fill="#002025"
              />
              <path
                id="Path_3641"
                data-name="Path 3641"
                d="M2614.092,14.9a4.428,4.428,0,0,1,1.285-3.225,5.07,5.07,0,0,1,6.8,0,4.43,4.43,0,0,1,1.285,3.225,4.427,4.427,0,0,1-1.285,3.225,5.07,5.07,0,0,1-6.8,0,4.426,4.426,0,0,1-1.285-3.225m8.97,31.244q-.555.1-1.638.277a13.67,13.67,0,0,1-2.192.176,11.843,11.843,0,0,1-1.99-.151,3.389,3.389,0,0,1-1.487-.6,2.906,2.906,0,0,1-.932-1.235,5.337,5.337,0,0,1-.327-2.041V22.051q.553-.1,1.638-.277a13.644,13.644,0,0,1,2.192-.176,11.855,11.855,0,0,1,1.99.151,3.394,3.394,0,0,1,1.487.6,2.913,2.913,0,0,1,.932,1.235,5.353,5.353,0,0,1,.328,2.041Z"
                transform="translate(-2406.977 -10.36)"
                fill="#002025"
              />
              <path
                id="Path_3642"
                data-name="Path 3642"
                d="M2775.1,134.941a7.092,7.092,0,0,1-2.872,6q-2.873,2.166-8.467,2.167a23.944,23.944,0,0,1-3.93-.3,11.259,11.259,0,0,1-3.1-.932,5.538,5.538,0,0,1-2.016-1.587,3.627,3.627,0,0,1-.73-2.268,3.866,3.866,0,0,1,.5-2.041,5.087,5.087,0,0,1,1.209-1.386,20.028,20.028,0,0,0,3.351,1.436,13.761,13.761,0,0,0,4.359.63,5.094,5.094,0,0,0,2.394-.454,1.358,1.358,0,0,0,.831-1.209,1.266,1.266,0,0,0-.6-1.109,5.627,5.627,0,0,0-2.016-.655l-1.512-.3a14.141,14.141,0,0,1-6.525-2.7,6.558,6.558,0,0,1-2.142-5.266,6.955,6.955,0,0,1,3.074-5.9,11.384,11.384,0,0,1,3.5-1.562,17.193,17.193,0,0,1,4.51-.554,21.06,21.06,0,0,1,3.5.277,11.425,11.425,0,0,1,2.847.831,5.152,5.152,0,0,1,1.915,1.436,3.247,3.247,0,0,1,.706,2.091,4.3,4.3,0,0,1-.428,1.99,4.487,4.487,0,0,1-1.083,1.386,6.256,6.256,0,0,0-1.209-.529q-.807-.276-1.764-.5t-1.94-.378a11.872,11.872,0,0,0-1.79-.151,6.905,6.905,0,0,0-2.569.378,1.253,1.253,0,0,0-.908,1.184,1.064,1.064,0,0,0,.5.907,5.766,5.766,0,0,0,1.915.655l1.563.353q4.838,1.109,6.878,3.049a6.609,6.609,0,0,1,2.041,5.014"
                transform="translate(-2532.908 -106.418)"
                fill="#002025"
              />
            </g>
          </g>
        </svg>
      );

    case IconName.home:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={className}
          strokeLinejoin="round"
        >
          <path className={className} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline className={className} points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );

    case IconName.logout:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      );

    case IconName.active:
      return <MdDone className={className} />;
    case IconName.house:
      return <PiHouseLineLight className={className} />;
    case IconName.heart:
      return <IoMdHeartEmpty className={className} />;
    case IconName.forest:
      return (
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3333 14V14.2667C14.2077 14.6029 14.9364 15.2355 15.3922 16.054C15.848 16.8725 16.0021 17.825 15.8275 18.7455C15.6529 19.6659 15.1608 20.4959 14.437 21.0907C13.7131 21.6854 12.8035 22.0072 11.8666 22H6.66663C5.74099 21.977 4.852 21.6335 4.15131 21.0282C3.45061 20.423 2.9816 19.5933 2.82428 18.6809C2.66696 17.7684 2.83107 16.8296 3.28862 16.0246C3.74616 15.2197 4.46881 14.5983 5.3333 14.2667V14C5.3333 12.9391 5.75473 11.9217 6.50487 11.1716C7.25502 10.4214 8.27243 10 9.3333 10C10.3942 10 11.4116 10.4214 12.1617 11.1716C12.9119 11.9217 13.3333 12.9391 13.3333 14Z"
            stroke="#1B4C28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.3335 22V30"
            stroke="#1B4C28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.3335 26V30"
            stroke="#1B4C28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0001 25.9998H27.0668C27.3278 25.9962 27.5819 25.916 27.7978 25.7693C28.0136 25.6225 28.1816 25.4156 28.281 25.1743C28.3803 24.933 28.4067 24.6678 28.3568 24.4116C28.3069 24.1554 28.1829 23.9195 28.0001 23.7332L24.0001 19.3332H24.4001C24.6611 19.3295 24.9153 19.2493 25.1311 19.1026C25.3469 18.9558 25.5149 18.749 25.6143 18.5076C25.7137 18.2663 25.74 18.0011 25.6901 17.7449C25.6402 17.4888 25.5162 17.2529 25.3335 17.0665L21.3335 12.6665H21.6001C21.8725 12.6911 22.1458 12.6313 22.383 12.4953C22.6202 12.3593 22.8099 12.1537 22.9263 11.9063C23.0428 11.6589 23.0803 11.3816 23.0339 11.1122C22.9875 10.8427 22.8593 10.594 22.6668 10.3998L17.3335 4.6665L15.4668 6.6665"
            stroke="#1B4C28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case IconName.back:
      return <FiArrowLeft className={className} />;
    case IconName.burger:
      return <FiMenu className={className} />;
    case IconName.showMore:
      return <MdUnfoldMore className={className} />;
    case IconName.edit:
      return <MdOutlineEdit className={className} />;
    case IconName.fishThin:
      return (
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.6665 21.6669C2.6665 21.6669 14.6665 1.6669 29.3332 16.3336C14.6665 31.0002 2.6665 11.0002 2.6665 11.0002"
            stroke="#1B4C28"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case IconName.deleteItem:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke="red"
          fill="transparent"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            stroke="red"
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
          <line stroke="red" x1="10" y1="11" x2="10" y2="17"></line>
          <line stroke="red" x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      );
    case IconName.time:
      return <FiClock className={className} />;
    case IconName.calendar:
      return <IoMdCalendar className={className} />;
    case IconName.exit:
      return <MdExitToApp className={className} />;
    case IconName.users:
      return <HiOutlineUsers className={className} />;
    case IconName.phone:
      return <MdOutlineLocalPhone className={className} />;
    case IconName.email:
      return <FiMail className={className} />;
    case IconName.dropdownArrow:
      return <MdKeyboardArrowDown className={className} />;
    case IconName.arrowTrending:
      return (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 7.98242L13.5 16.4824L8.5 11.4824L2 17.9824"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 7.98242H22V13.9824"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case IconName.close:
      return <CgClose className={className} {...rest} />;
    case IconName.person:
      return <IoPersonOutline className={className} />;
    case IconName.anchor:
      return <FaAnchor className={className} />;
    case IconName.right:
      return <FaChevronRight className={className} />;
    case IconName.check:
      return <FaCheck className={className} />;
    case IconName.scales:
      return <LiaBalanceScaleSolid className={className} />;
    case IconName.return:
      return <PiArrowBendDownLeftBold className={className} />;
    case IconName.visibleOn:
      return <MdOutlineVisibility className={className} />;
    case IconName.visibleOff:
      return <MdOutlineVisibilityOff className={className} />;
    case IconName.arrowUpRight:
      return <FiArrowUpRight className={className} {...rest} />;
    case IconName.eGate:
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <g id="Group_6068" data-name="Group 6068" transform="translate(-349.5 -473.5)">
            <path
              id="Path_2975"
              data-name="Path 2975"
              d="M365.876,473.5H351.124a1.624,1.624,0,0,0-1.624,1.624v14.752a1.624,1.624,0,0,0,1.624,1.624h.715v-8.064a6.661,6.661,0,0,1,6.661-6.661h0a6.661,6.661,0,0,1,6.661,6.661V491.5h.715a1.624,1.624,0,0,0,1.624-1.624V475.124A1.624,1.624,0,0,0,365.876,473.5Z"
              transform="translate(0 0)"
              fill="#121A55"
            />
            <path
              id="Path_2976"
              data-name="Path 2976"
              d="M386.98,529.746c-.8.366.412-1.146-.262-.907-.011-.077.122-.252.2-.136.115.016,0-.147-.087-.1-.737-.276-1.219-1-1.838-1.46.04-.25-.94-.053-1.251-.254-.077-.1-.422-1.092-.426-.7-.5-.1-.641.812-1.07.366-.5.27-.477.071-.924-.1-.12-.082-.448.138-.32-.041.022-.1-.153.013-.285-.039-.224.287-.548-.19-.861-.015-.3.605-.289-.29-.532-.177-.542.475-1.26-.357-1.959.11-2.692.459-1.638,2.136-1.535,3.648-.057.243.174-.084.253-.018.053.259.94.714,1.213.711.193-.116.069.427.324.12a1.353,1.353,0,0,1,.693.016c.527-.279.107.314.6.365.4.31.189.567-.109.874-.011.649-.245,1.018.474,1.014.183-.041.065.094.2.106s-.106.207.236.169c1.148.256.4,1.668,1.382,1.243.051.08.2.028.292-.049.51.233.451-.322.791.178.517.062.426-.3.868-.357.148.277.467.031.213-.358.194-.033.043-.038.1-.129.318-.065.172-.092.4.062.445-.064.3-.442.444-.473.351.183.374-.2.584-.111-.043.093.332.262.032.212-.176.422.8.5.526-.223-.21.1,0-.076-.149-.119-.516.244-.276-.151-.173-.373-.051-.364.149-.263.269-.47,0-.2-.211-.615,0-.752.222-.975.831-.051,1-1.125.044-.241.417.141.414-.078.2-.079.39.343.374-.153C387.255,529.909,387.735,529.873,386.98,529.746Z"
              transform="translate(-22.714 -44.877)"
              fill="#121A55"
            />
          </g>
        </svg>
      );

    case IconName.fourSquares:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      );

    case IconName.journal:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      );
    case IconName.members:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case IconName.tools:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="6" r="3" />
          <path d="M12,9v8.5" />
          <path
            d="M16,15l3-3v5.5c0,1.9-1.6,3.5-3.5,3.5h0c-1.9,0-3.5-1.6-3.5-3.5c0,1.9-1.6,3.5-3.5,3.5h0C6.6,21,5,19.4,5,17.5
V12l3,3"
          />
        </svg>
      );
    case IconName.settings:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      );
    case IconName.profile:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case IconName.investigations:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="m19,5.11c-1.89,2.4-4.8,3.94-8.06,3.94s-6.17-1.54-8.06-3.94c1.89-2.4,4.8-3.94,8.06-3.94s6.26,1.54,8.06,3.94Z" />
          <path d="m1,1c.26,1.54.94,2.91,1.89,4.11" />
          <path d="m1,9.23c.26-1.54.94-2.91,1.89-4.11" />
          <line x1="19.06" y1="18.55" x2="1.06" y2="18.55" />
          <line x1="1.06" y1="18.55" x2="1.06" y2="12.55" />
          <line x1="19.06" y1="18.55" x2="19.06" y2="12.55" />
          <line x1="10.06" y1="18.55" x2="10.06" y2="15.55" />
        </svg>
      );
    case IconName.net:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4,13c0.5,0.2,3.6,1.7,7.1,0.1c2.7-1.2,3.8-3.6,4.1-4.2"></path>
          <path d="M4,18c1,0.3,4.3,1.4,8.1,0c4.9-1.8,6.7-6.3,7-7"></path>
          <line x1="4" y1="3" x2="4" y2="21"></line>
          <line x1="18" y1="18" x2="4" y2="3"></line>
          <polyline points="21,12 4,3 12,21 "></polyline>
        </svg>
      );

    case IconName.connection:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="21" r="1" />
          <circle cx="19" cy="3" r="1" />
          <path d="M15,12h1.5c2.5,0,4.5,2,4.5,4.5v0c0,2.5-2,4.5-4.5,4.5H6" />
          <path d="M18,3H7.5C5,3,3,5,3,7.5v0C3,10,5,12,7.5,12H9" />
        </svg>
      );

    case IconName.startFishing:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="116"
          height="115.841"
          viewBox="0 0 116 115.841"
          className={className}
        >
          <path
            id="ship"
            d="M11.558,90.3a5.784,5.784,0,1,0,10.749-4.276l-6.472-16.3,38.372-8.5v27.45a5.779,5.779,0,0,0,11.558,0V61.234l38.372,8.5-6.472,16.3A5.784,5.784,0,0,0,108.414,90.3l8.957-22.6a5.849,5.849,0,0,0-4.1-7.8L94.66,55.8V30.895a5.779,5.779,0,0,0-5.779-5.779H77.323V7.779A5.779,5.779,0,0,0,71.544,2H48.428a5.779,5.779,0,0,0-5.779,5.779V25.116H31.091a5.779,5.779,0,0,0-5.779,5.779V55.8L6.7,59.79a5.849,5.849,0,0,0-4.1,7.8ZM54.207,13.558H65.765V25.116H54.207ZM36.87,36.674H83.1V53.2l-21.845-4.97H58.715L36.87,53.2Zm73.451,65.187a25.312,25.312,0,0,0-5.779,2.6,12.02,12.02,0,0,1-12.136,0,26.7,26.7,0,0,0-26.237,0,12.367,12.367,0,0,1-12.251,0,26.814,26.814,0,0,0-26.237,0,12.02,12.02,0,0,1-12.136,0,25.312,25.312,0,0,0-5.779-2.6,5.779,5.779,0,0,0-7.57,4.161,5.779,5.779,0,0,0,3.872,7.166,12.136,12.136,0,0,1,3.294,1.445,23.116,23.116,0,0,0,11.558,3.178,23.929,23.929,0,0,0,12.024-3.238,15.314,15.314,0,0,1,14.79,0,23.983,23.983,0,0,0,23.809,0,15.314,15.314,0,0,1,14.794,0,23.116,23.116,0,0,0,23.694,0,12.136,12.136,0,0,1,3.294-1.445,5.841,5.841,0,1,0-3.005-11.269Z"
            transform="translate(-1.959 -2)"
            fill="#1121DA"
          ></path>
        </svg>
      );
    case IconName.beginFishing:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polyline className="st0" points="5.7,19.3 2,14.4 22,9.9 18.5,18.9 "></polyline>
          <polyline className="st0" points="16.7,11.1 11.2,7.2 4.5,7.2 4,13.9 "></polyline>
          <line className="st0" x1="8" y1="4.6" x2="8" y2="7.2"></line>
          <path
            className="st0"
            d="M2.1,18.4c2.4,0,2.4,1,4.7,1c2.4,0,2.4-1,4.7-1c2.4,0,2.4,1,4.7,1s2.4-1,4.7-1"
          ></path>
        </svg>
      );
    case IconName.endFishing:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="116"
          height="116"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      );

    case IconName.location:
      return <MdLocationOn className={className} />;
    case IconName.researches:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="m19,5.11c-1.89,2.4-4.8,3.94-8.06,3.94s-6.17-1.54-8.06-3.94c1.89-2.4,4.8-3.94,8.06-3.94s6.26,1.54,8.06,3.94Z" />
          <path d="m1,1c.26,1.54.94,2.91,1.89,4.11" />
          <path d="m1,9.23c.26-1.54.94-2.91,1.89-4.11" />
          <line x1="19.06" y1="18.55" x2="1.06" y2="18.55" />
          <line x1="1.06" y1="18.55" x2="1.06" y2="12.55" />
          <line x1="19.06" y1="18.55" x2="19.06" y2="12.55" />
          <line x1="10.06" y1="18.55" x2="10.06" y2="15.55" />
        </svg>
      );

    case IconName.fullscreen:
      return <MdOutlineFullscreen className={className} />;
    case IconName.exitFullScreen:
      return <MdOutlineFullscreenExit className={className} />;
    case IconName.download:
      return <FiDownload className={className} />;
    case IconName.remove:
      return <FaRegTrashAlt className={className} />;

    case IconName.finishFishing:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      );

    case IconName.fish:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M22.5,12c-2.2,2.8-5.6,4.6-9.4,4.6c-3.8,0-7.2-1.8-9.4-4.6c2.2-2.8,5.6-4.6,9.4-4.6S20.4,9.2,22.5,12z"></path>
          <path d="M1.5,7.2C1.8,9,2.6,10.6,3.7,12"></path>
          <path d="M1.5,16.8C1.8,15,2.6,13.4,3.7,12"></path>
        </svg>
      );
    case IconName.search:
      return <IoSearch className={className} />;

    case IconName.locationOutline:
      return <IoLocationOutline className={className} />;

    case IconName.filter:
      return <IoFilter className={className} {...rest} />;

    case IconName.map:
      return <PiMapTrifoldBold className={className} {...rest} />;
    default:
      return null;
  }
};

export default Icon;
