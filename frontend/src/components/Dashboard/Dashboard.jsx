import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import Layout from '../Layout/Layout';
import './Dashboard.css';
import {
  FiCheckCircle, FiCircle, FiTarget, FiTrendingUp, FiBarChart2, FiBookmark,
  FiEdit, FiCopy, FiFileText, FiExternalLink, FiSettings, FiLogOut, FiUser,
  FiBell, FiSearch, FiMenu, FiX, FiFilter, FiAward, FiTrendingDown, FiArrowLeft,
  FiHash, FiGrid, FiLayers
} from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

// Custom LeetCode Icon Component
const LeetCodeIcon = ({ className }) => (
  <SiLeetcode className={className} />
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [showOnlyRevision, setShowOnlyRevision] = useState(false);
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Comprehensive Striver SDE Sheet questions organized by categories  
  const [questions, setQuestions] = useState([
    // Arrays (includes Arrays Part I-IV)
    {
      id: "stmtrixzrs",
      title: "Set Matrix Zeros",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
      articleUrl: "https://takeuforward.org/data-structure/set-matrix-zero/"
    },
    {
      id: "psclstringl",
      title: "Pascal's Triangle",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/pascals-triangle/",
      articleUrl: "https://takeuforward.org/data-structure/program-to-generate-pascals-triangle/"
    },
    {
      id: "nxtprmttin",
      title: "Next Permutation",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
      articleUrl: "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/"
    },
    {
      id: "kdnslgrithm",
      title: "Kadane's Algorithm",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
      articleUrl: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
    },
    {
      id: "srtnrryf0s1s2s",
      title: "Sort an array of 0's, 1's and 2's",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
      articleUrl: "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/"
    },
    {
      id: "stckbyndsll",
      title: "Stock Buy and Sell",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      articleUrl: "https://takeuforward.org/data-structure/stock-buy-and-sell/"
    },
    {
      id: "rttmtrix",
      title: "Rotate Matrix",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
      articleUrl: "https://takeuforward.org/data-structure/rotate-image-by-90-degree/"
    },
    {
      id: "mrgvrlppingsbintrvls",
      title: "Merge Overlapping Subintervals",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
      articleUrl: "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/"
    },
    {
      id: "mrgtwsrtdrryswithtxtrspc",
      title: "Merge two sorted arrays without extra space",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/",
      articleUrl: "https://takeuforward.org/data-structure/merge-two-sorted-arrays-without-extra-space/"
    },
    {
      id: "findthdplictinnrryfn1intgrs",
      title: "Find the duplicate in an array of N+1 integers",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
      articleUrl: "https://takeuforward.org/data-structure/find-the-duplicate-in-an-array-of-n1-integers/"
    },
    {
      id: "rptndmissingnmbr",
      title: "Repeat and Missing Number",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/"
    },
    {
      id: "invrsinfrryprrqmrgsrt",
      title: "Inversion of Array (Pre-req: Merge Sort)",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/count-inversions-in-an-array/"
    },
    {
      id: "srchin2dmtrix",
      title: "Search in a 2 D matrix",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
      articleUrl: "https://takeuforward.org/data-structure/search-in-a-sorted-2d-matrix/"
    },
    {
      id: "pwxn",
      title: "Pow(x, n)",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/powx-n/",
      articleUrl: "https://takeuforward.org/data-structure/implement-powxn-x-raised-to-the-power-n/"
    },
    {
      id: "mjritylmntn2tims",
      title: "Majority Element (>n/2 times)",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/majority-element/",
      articleUrl: "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/"
    },
    {
      id: "mjritylmntn3tims",
      title: "Majority Element (n/3 times)",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/majority-element-ii/",
      articleUrl: "https://takeuforward.org/data-structure/majority-elementsn-3-times-find-the-elements-that-appears-more-than-n-3-times-in-the-array/"
    },
    {
      id: "gridniqpths",
      title: "Grid Unique Paths",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
      articleUrl: "https://takeuforward.org/data-structure/grid-unique-paths-count-paths-from-left-top-to-the-right-bottom-of-a-matrix/"
    },
    {
      id: "rvrspirsltcd",
      title: "Reverse Pairs (Leetcode)",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-pairs/",
      articleUrl: "https://takeuforward.org/data-structure/count-reverse-pairs/"
    },
    {
      id: "2smprblm",
      title: "2Sum Problem",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      articleUrl: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
    },
    {
      id: "4smprblm",
      title: "4-Sum Problem",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/4sum/",
      articleUrl: "https://takeuforward.org/data-structure/4-sum-find-quads-that-add-up-to-a-target-value/"
    },
    {
      id: "lngstcnsctivsqnc",
      title: "Longest Consecutive Sequence",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
      articleUrl: "https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/"
    },
    {
      id: "lrgstsbrrywithksm",
      title: "Largest Subarray with K sum",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/"
    },
    {
      id: "cntnmbrfsbrryswithgivnxrk",
      title: "Count number of subarrays with given xor K",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/"
    },
    {
      id: "lngstsbstringwithtrpt",
      title: "Longest Substring without repeat",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      articleUrl: "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/"
    },
    {
      id: "rmvdplictfrmsrtdrry",
      title: "Remove Duplicate from Sorted array",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      articleUrl: "https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/"
    },
    {
      id: "mxcnsctivns",
      title: "Max consecutive ones",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones/",
      articleUrl: "https://takeuforward.org/data-structure/count-maximum-consecutive-ones-in-the-array/"
    },

    // Linked List (includes all Linked List variations)
    {
      id: "rvrslinkdlist",
      title: "Reverse a LinkedList",
      difficulty: "Easy",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
      articleUrl: "https://takeuforward.org/data-structure/reverse-a-linked-list/"
    },
    {
      id: "findthmiddlflinkdlist",
      title: "Find the middle of LinkedList",
      difficulty: "Easy",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/",
      articleUrl: "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/"
    },
    {
      id: "mrgtwsrtdlinkdlistsmthdsdinmrgsrt",
      title: "Merge two sorted Linked List (use method used in mergeSort)",
      difficulty: "Easy",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
      articleUrl: "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/"
    },
    {
      id: "rmvnthndfrmbckflinkdlist",
      title: "Remove N-th node from back of LinkedList",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      articleUrl: "https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/"
    },
    {
      id: "ddtwnmbrsslinkdlist",
      title: "Add two numbers as LinkedList",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
      articleUrl: "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists/"
    },
    {
      id: "dltgivnndwhnndisgivn01sltin",
      title: "Delete a given Node when a node is given.(0(1) solution)",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
      articleUrl: "https://takeuforward.org/data-structure/delete-given-node-in-a-linked-list-o1-approach/"
    },
    {
      id: "findintrsctinpintfylinkdlist",
      title: "Find intersection point of Y LinkedList",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
      articleUrl: "https://takeuforward.org/data-structure/find-intersection-of-two-linked-lists/"
    },
    {
      id: "dtctcyclinlinkdlist",
      title: "Detect a cycle in Linked List",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
      articleUrl: "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/"
    },
    {
      id: "rvrslinkdlistingrpsfsizk",
      title: "Reverse a LinkedList in groups of size k.",
      difficulty: "Hard",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      articleUrl: "https://takeuforward.org/data-structure/reverse-linked-list-in-groups-of-size-k/"
    },
    {
      id: "chckiflinkdlistisplindrmrnt",
      title: "Check if a LinkedList is palindrome or not.",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
      articleUrl: "https://takeuforward.org/data-structure/check-if-given-linked-list-is-plaindrome/"
    },
    {
      id: "findthstrtingpintfthlpflinkdlist",
      title: "Find the starting point of the Loop of LinkedList",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
      articleUrl: "https://takeuforward.org/data-structure/starting-point-of-loop-in-a-linked-list/"
    },
    {
      id: "flttningflinkdlist",
      title: "Flattening of a LinkedList",
      difficulty: "Hard",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/flattening-a-linked-list/"
    },
    {
      id: "rttlinkdlist",
      title: "Rotate a LinkedList",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/rotate-list/description/",
      articleUrl: "https://takeuforward.org/data-structure/rotate-a-linked-list/"
    },
    {
      id: "clnlinkdlistwithrndmndnxtpintr",
      title: "Clone a Linked List with random and next pointer",
      difficulty: "Hard",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
      articleUrl: "https://takeuforward.org/data-structure/clone-linked-list-with-random-and-next-pointer/"
    },

    // Two Pointers
    {
      id: "3sm",
      title: "3 sum",
      difficulty: "Medium",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/3sum/",
      articleUrl: "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/"
    },
    {
      id: "trppingrinwtr",
      title: "Trapping Rainwater",
      difficulty: "Hard",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
      articleUrl: "https://takeuforward.org/data-structure/trapping-rainwater/"
    },

    // Greedy Algorithm
    {
      id: "nmtingsinnrm",
      title: "N meetings in one room",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/n-meetings-in-one-room/"
    },
    {
      id: "minimmnmbrfpltfrmsrqirdfrrilwy",
      title: "Minimum number of platforms required for a railway",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/"
    },
    {
      id: "jbsqncingprblm",
      title: "Job sequencing Problem",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/job-sequencing-problem/"
    },
    {
      id: "frctinlknpsckprblm",
      title: "Fractional Knapsack Problem",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/fractional-knapsack-problem-greedy-approach/"
    },
    {
      id: "grdylgrithmtfindminimmnmbrfcins",
      title: "Greedy algorithm to find minimum number of coins",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/find-minimum-number-of-coins/"
    },
    {
      id: "ctivityslctinitisthsmsnmtinginnrm",
      title: "Assign Cookies",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/assign-cookies/",
      articleUrl: ""
    },

    // Recursion & Backtracking
    {
      id: "sbstsms",
      title: "Subset Sums",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/"
    },
    {
      id: "sbstii",
      title: "Subset-II",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
      articleUrl: "https://takeuforward.org/data-structure/subset-ii-print-all-the-unique-subsets/"
    },
    {
      id: "cmbintinsm1",
      title: "Combination sum-1",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
      articleUrl: "https://takeuforward.org/data-structure/combination-sum-1/"
    },
    {
      id: "cmbintinsm2",
      title: "Combination sum-2",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/",
      articleUrl: "https://takeuforward.org/data-structure/combination-sum-ii-find-all-unique-combinations/"
    },
    {
      id: "plindrmprtitining",
      title: "Palindrome Partitioning",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/",
      articleUrl: "https://takeuforward.org/data-structure/palindrome-partitioning/"
    },
    {
      id: "kthprmttinsqnc",
      title: "K-th permutation Sequence",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/permutation-sequence/",
      articleUrl: "https://takeuforward.org/data-structure/find-k-th-permutation-sequence/"
    },
    {
      id: "printllprmttinsfstringrry",
      title: "Print all permutations of a string/array",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/permutations/",
      articleUrl: "https://takeuforward.org/data-structure/print-all-permutations-of-a-string-array/"
    },
    {
      id: "nqnsprblm",
      title: "N queens Problem",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/n-queens/",
      articleUrl: "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/"
    },
    {
      id: "sdkslvr",
      title: "Sudoko Solver",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
      articleUrl: "https://takeuforward.org/data-structure/sudoku-solver/"
    },
    {
      id: "mclringprblm",
      title: "M Coloring Problem",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/m-coloring-problem/"
    },
    {
      id: "rtinmz",
      title: "Rat in a Maze",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/rat-in-a-maze/"
    },

    // Binary Search
    {
      id: "thnthrtfnintgr",
      title: "The N-th root of an integer",
      difficulty: "Easy",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/"
    },
    {
      id: "mtrixmdin",
      title: "Matrix Median",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix/"
    },
    {
      id: "findthlmntthtpprsncinsrtdrryndthrstlmntpprstwicbinrysrch",
      title: "Find the element that appears once in a sorted array, and the rest element appears twice (Binary search)",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
      articleUrl: "https://takeuforward.org/data-structure/search-single-element-in-a-sorted-array/"
    },
    {
      id: "srchlmntinsrtdndrttdrryfindpivtwhritisrttd",
      title: "Search element in a sorted and rotated array/ find pivot where it is rotated",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      articleUrl: "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/"
    },
    {
      id: "mdinf2srtdrrys",
      title: "Median of 2 sorted arrays",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      articleUrl: "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/"
    },
    {
      id: "kthlmntftwsrtdrrys",
      title: "K-th element of two sorted arrays",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/"
    },
    {
      id: "llctminimmnmbrfpgs",
      title: "Allocate Minimum Number of Pages",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/"
    },
    {
      id: "ggrssivcws",
      title: "Aggressive Cows",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/"
    },

    // Heaps
    {
      id: "mxhpminhpimplmnttinnlyfrintrviws",
      title: "Max heap, Min Heap Implementation (Only for interviews)",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "kthlrgstlmnt",
      title: "Kth Largest Element",
      difficulty: "Easy",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      articleUrl: "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
    },
    {
      id: "mximmsmcmbintin",
      title: "Maximum Sum Combination",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "findmdinfrmdtstrm",
      title: "Find Median from Data Stream",
      difficulty: "Hard",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
      articleUrl: ""
    },
    {
      id: "mrgksrtdrrys",
      title: "Merge K sorted arrays",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "kmstfrqntlmnts",
      title: "K most frequent elements",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
      articleUrl: ""
    },

    // Stack & Queue
    {
      id: "implmntstcksingrrys",
      title: "Implement Stack using Arrays",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/implement-stack-using-array/"
    },
    {
      id: "implmntqsingrrys",
      title: "Implement Queue using Arrays",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/implement-queue-using-array/"
    },
    {
      id: "implmntstcksingqsingsinglq",
      title: "Implement Stack using Queue (using single queue)",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/",
      articleUrl: "https://takeuforward.org/data-structure/implement-stack-using-single-queue/"
    },
    {
      id: "implmntqsingstck01mrtizdmthd",
      title: "Implement Queue using Stack (0(1) amortized method)",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
      articleUrl: "https://takeuforward.org/data-structure/implement-queue-using-stack/"
    },
    {
      id: "chckfrblncdprnthss",
      title: "Check for balanced parentheses",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
      articleUrl: "https://takeuforward.org/data-structure/check-for-balanced-parentheses/"
    },
    {
      id: "nxtgrtrlmnt",
      title: "Next Greater Element",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
      articleUrl: "https://takeuforward.org/data-structure/next-greater-element-using-stack/"
    },
    {
      id: "srtstck",
      title: "Sort a Stack",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "nxtsmllrlmnt",
      title: "Next Smaller Element",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "lrcchimprtnt",
      title: "LRU cache (IMPORTANT)",
      difficulty: "Hard",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
      articleUrl: "https://takeuforward.org/data-structure/implement-lru-cache/"
    },
    {
      id: "lfcch",
      title: "LFU cache",
      difficulty: "Hard",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lfu-cache/",
      articleUrl: ""
    },
    {
      id: "lrgstrctnglinhistgrm",
      title: "Largest rectangle in a histogram",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      articleUrl: "https://takeuforward.org/data-structure/area-of-largest-rectangle-in-histogram/"
    },
    {
      id: "slidingwindwmximm",
      title: "Sliding Window maximum",
      difficulty: "Hard",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
      articleUrl: "https://takeuforward.org/data-structure/sliding-window-maximum/"
    },
    {
      id: "implmntminstck",
      title: "Implement Min Stack",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/min-stack/",
      articleUrl: "https://takeuforward.org/data-structure/implement-min-stack-o2n-and-on-space-complexity/"
    },
    {
      id: "rttnrngsingbfs",
      title: "Rotten Orange (Using BFS)",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
      articleUrl: "https://takeuforward.org/data-structure/rotten-oranges-min-time-to-rot-all-oranges-bfs/"
    },
    {
      id: "stckspnprblm",
      title: "Stock span problem",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
      articleUrl: ""
    },
    {
      id: "findthmximmfminimmsfvrywindwsiz",
      title: "Find the maximum of minimums of every window size",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "thclbrityprblm",
      title: "The Celebrity Problem",
      difficulty: "Hard",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },

    // String
    {
      id: "rvrswrdsinstring",
      title: "Reverse Words in a String",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
      articleUrl: "https://takeuforward.org/data-structure/reverse-words-in-a-string/"
    },
    {
      id: "lngstplindrminstring",
      title: "Longest Palindrome in a string",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
      articleUrl: ""
    },
    {
      id: "rmnnmbrtintgrndvicvrs",
      title: "Roman Number to Integer and vice versa",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/",
      articleUrl: ""
    },
    {
      id: "implmnttistrstr",
      title: "Implement ATOI/STRSTR",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/string-to-integer-atoi/",
      articleUrl: ""
    },
    {
      id: "lngstcmmnprfix",
      title: "Longest Common Prefix",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
      articleUrl: ""
    },
    {
      id: "rbinkrp",
      title: "Rabin Karp",
      difficulty: "Hard",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "zfnctin",
      title: "Z-Function",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/implement-strstr/",
      articleUrl: ""
    },
    {
      id: "kmplglpspirry",
      title: "KMP algo / LPS(pi) array",
      difficulty: "Hard",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/implement-strstr/",
      articleUrl: ""
    },
    {
      id: "minimchrctrsnddtbinsrtdinthbginningtmkitplindrmic",
      title: "Minimum characters needed to be inserted in the beginning to make it palindromic",
      difficulty: "Hard",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "chckfrngrms",
      title: "Check for Anagrams",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
      articleUrl: ""
    },
    {
      id: "cntndsy",
      title: "Count and say",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/count-and-say/",
      articleUrl: ""
    },
    {
      id: "cmprvrsinnmbrs",
      title: "Compare version numbers",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/compare-version-numbers/",
      articleUrl: ""
    },

    // Binary Tree
    {
      id: "inrdrtrvrsl",
      title: "Inorder Traversal",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/"
    },
    {
      id: "prrdrtrvrsl",
      title: "Preorder Traversal",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/preorder-traversal-of-binary-tree/"
    },
    {
      id: "pstrdrtrvrsl",
      title: "Postorder Traversal",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/post-order-traversal-of-binary-tree/"
    },
    {
      id: "mrrisinrdrtrvrsl",
      title: "Morris Inorder Traversal",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/morris-inorder-traversal-of-a-binary-tree/"
    },
    {
      id: "mrrisprrdrtrvrsl",
      title: "Morris Preorder Traversal",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/morris-preorder-traversal-of-a-binary-tree/"
    },
    {
      id: "lftviwfbinrytr",
      title: "LeftView Of Binary Tree",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/right-left-view-of-binary-tree/"
    },
    {
      id: "bttmviwfbinrytr",
      title: "Bottom View of Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/bottom-view-of-a-binary-tree/"
    },
    {
      id: "tpviwfbinrytr",
      title: "Top View of Binary Tree",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/top-view-of-a-binary-tree/"
    },
    {
      id: "prrdrinrdrpstrdrinsingltrvrsl",
      title: "Preorder inorder postorder in a single traversal",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/preorder-inorder-postorder-traversals-in-one-traversal/"
    },
    {
      id: "vrticlrdrtrvrsl",
      title: "Vertical order traversal",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/vertical-order-traversal-of-binary-tree/"
    },
    {
      id: "rttndpthinbinrytr",
      title: "Root to Node Path in Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/print-root-to-node-path-in-a-binary-tree/"
    },
    {
      id: "mxwidthfbinrytr",
      title: "Max width of a Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/maximum-width-of-a-binary-tree/"
    },
    {
      id: "lvlrdrtrvrsllvlrdrtrvrslinspirlfrm",
      title: "Level order Traversal / Level order traversal in spiral form",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/"
    },
    {
      id: "hightfbinrytr",
      title: "Height of a Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/"
    },
    {
      id: "dimtrfbinrytr",
      title: "Diameter of Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/calculate-the-diameter-of-a-binary-tree/"
    },
    {
      id: "chckifthbinrytrishightblncdrnt",
      title: "Check if the Binary tree is height-balanced or not",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/check-if-the-binary-tree-is-balanced-binary-tree/"
    },
    {
      id: "lcinbinrytr",
      title: "LCA in Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/"
    },
    {
      id: "chckiftwtrsridnticlrnt",
      title: "Check if two trees are identical or not",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/same-tree/",
      articleUrl: "https://takeuforward.org/data-structure/check-if-two-trees-are-identical/"
    },
    {
      id: "zigzgtrvrslfbinrytr",
      title: "Zig Zag Traversal of Binary Tree",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/zig-zag-traversal-of-binary-tree/"
    },
    {
      id: "bndrytrvrslfbinrytr",
      title: "Boundary Traversal of Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/boundary-of-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/boundary-traversal-of-a-binary-tree/"
    },
    {
      id: "mximmpthsm",
      title: "Maximum path sum",
      difficulty: "Hard",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      articleUrl: "https://takeuforward.org/data-structure/maximum-sum-path-in-binary-tree/"
    },
    {
      id: "cnstrctbinrytrfrminrdrndprrdr",
      title: "Construct Binary Tree from inorder and preorder",
      difficulty: "Hard",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
      articleUrl: "https://takeuforward.org/data-structure/construct-a-binary-tree-from-inorder-and-preorder-traversal/"
    },
    {
      id: "cnstrctbinrytrfrminrdrndpstrdr",
      title: "Construct Binary Tree from Inorder and Postorder",
      difficulty: "Hard",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
      articleUrl: ""
    },
    {
      id: "symmtricbinrytr",
      title: "Symmetric Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
      articleUrl: "https://takeuforward.org/data-structure/check-for-symmetrical-binary-tree/"
    },
    {
      id: "flttnbinrytrtlinkdlist",
      title: "Flatten Binary Tree to LinkedList",
      difficulty: "Hard",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
      articleUrl: "https://takeuforward.org/data-structure/flatten-binary-tree-to-linked-list/"
    },

    // Binary Search Tree
    {
      id: "ppltnxtrightpintrsftr",
      title: "Populate Next Right pointers of Tree",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
      articleUrl: ""
    },
    {
      id: "srchgivnkyinbst",
      title: "Search given Key in BST",
      difficulty: "Easy",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
      articleUrl: ""
    },
    {
      id: "cnstrctbstfrmgivnkys",
      title: "Construct BST from given keys",
      difficulty: "Hard",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
      articleUrl: ""
    },
    {
      id: "cnstrctbstfrmprrdrtrvrsl",
      title: "Construct a BST from a preorder traversal",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
      articleUrl: ""
    },
    {
      id: "chckisbtisbstrnt",
      title: "Check is a BT is BST or not",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
      articleUrl: ""
    },
    {
      id: "findlcftwndsinbst",
      title: "Find LCA of two nodes in BST",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      articleUrl: ""
    },
    {
      id: "findthinrdrprdcssrsccssrfgivnkyinbst",
      title: "Find the inorder predecessor/successor of a given Key in BST.",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "flrinbst",
      title: "Floor in a BST",
      difficulty: "Easy",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "cilinbst",
      title: "Ceil in a BST",
      difficulty: "Easy",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "findkthsmllstlmntinbst",
      title: "Find K-th smallest element in BST",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      articleUrl: "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-binary-search-tree/"
    },
    {
      id: "findkthlrgstlmntinbst",
      title: "Find K-th largest element in BST",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-binary-search-tree/"
    },
    {
      id: "findpirwithgivnsminbst",
      title: "Find a pair with a given sum in BST",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
      articleUrl: ""
    },
    {
      id: "bstitrtr",
      title: "BST iterator",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-search-tree-iterator/",
      articleUrl: ""
    },
    {
      id: "sizfthlrgstbstinbinrytr",
      title: "Size of the largest BST in a Binary Tree",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
      articleUrl: ""
    },
    {
      id: "sriliznddsrilizbinrytr",
      title: "Serialize and deserialize Binary Tree",
      difficulty: "Hard",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
      articleUrl: "https://takeuforward.org/data-structure/serialize-and-deserialize-a-binary-tree/"
    },

    // Graph
    {
      id: "clngrphntthtsysitlks",
      title: "Clone a graph (Not that easy as it looks)",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
      articleUrl: ""
    },
    {
      id: "dfs",
      title: "DFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/depth-first-search-dfs/"
    },
    {
      id: "bfs",
      title: "BFS",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/graph/breadth-first-search-bfs-level-order-traversal/"
    },
    {
      id: "dtctcyclinndirctdgrphsingbfs",
      title: "Detect A cycle in Undirected Graph using BFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      articleUrl: "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/"
    },
    {
      id: "dtctcyclinndirctdgrphsingdfs",
      title: "Detect A cycle in Undirected Graph using DFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      articleUrl: "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-dfs/"
    },
    {
      id: "dtctcyclindirctdgrphsingdfs",
      title: "Detect A cycle in a Directed Graph using DFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      articleUrl: "https://takeuforward.org/data-structure/detect-a-cycle-in-directed-graph-topological-sort-kahns-algorithm-g-23/"
    },
    {
      id: "dtctcyclindirctdgrphsingbfs",
      title: "Detect A cycle in a Directed Graph using BFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      articleUrl: ""
    },
    {
      id: "tplgiclsrtbfs",
      title: "Topological Sort BFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/topological-sort-bfs/"
    },
    {
      id: "tplgiclsrtdfs",
      title: "Topological Sort DFS",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/topological-sort-using-dfs/"
    },
    {
      id: "nmbrfislndsdingridndgrphbth",
      title: "Number of islands(Do in Grid and Graph Both)",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
      articleUrl: "https://takeuforward.org/data-structure/number-of-distinct-islands/"
    },
    {
      id: "biprtitchcksingbfs",
      title: "Bipartite Check using BFS",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
      articleUrl: ""
    },
    {
      id: "biprtitchcksingdfs",
      title: "Bipartite Check using DFS",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
      articleUrl: "https://takeuforward.org/graph/bipartite-graph-dfs-implementation/"
    },
    {
      id: "strnglycnnctdcmpnntsingksrjslg",
      title: "Strongly Connected Component(using KosaRaju's algo)",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/graph/strongly-connected-components-kosarajus-algorithm-g-54/"
    },
    {
      id: "dijkstrslgrithm",
      title: "Dijkstra's Algorithm",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/g-35-print-shortest-path-dijkstras-algorithm/"
    },
    {
      id: "bllmnfrdlg",
      title: "Bellman-Ford Algo",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/bellman-ford-algorithm-g-41/"
    },
    {
      id: "flydwrshlllgrithm",
      title: "Floyd Warshall Algorithm",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/floyd-warshall-algorithm-g-42/"
    },
    {
      id: "mstsingprimslg",
      title: "MST using Prim's Algo",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
    },
    {
      id: "mstsingkrsklslg",
      title: "MST using Kruskal's Algo",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/kruskals-algorithm-minimum-spanning-tree-g-47/"
    },

    // Dynamic Programming
    {
      id: "mxprdctsbrry",
      title: "Max Product Subarray",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
      articleUrl: "https://takeuforward.org/data-structure/maximum-product-subarray-in-an-array/"
    },
    {
      id: "lngstincrsingsbsqnc",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
      articleUrl: "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/"
    },
    {
      id: "lngstcmmnsbsqnc",
      title: "Longest Common Subsequence",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
      articleUrl: "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/"
    },
    {
      id: "01knpsck",
      title: "0-1 Knapsack",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/"
    },
    {
      id: "ditdistnc",
      title: "Edit Distance",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
      articleUrl: "https://takeuforward.org/data-structure/edit-distance-dp-33/"
    },
    {
      id: "mximmsmincrsingsbsqnc",
      title: "Maximum sum increasing subsequence",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "mtrixchinmltiplictin",
      title: "Matrix Chain Multiplication",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/dynamic-programming/matrix-chain-multiplication-dp-48/"
    },
    {
      id: "minimmsmpthinthmtrixcntpthsndsimilrtypdlsbcktrcktfindthminimmpth",
      title: "Minimum sum path in the matrix, (count paths and similar type do, also backtrack to find the Minimum path)",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
      articleUrl: "https://takeuforward.org/data-structure/minimum-path-sum-in-a-grid-dp-10/"
    },
    {
      id: "cinchng",
      title: "Coin change",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/coin-change/",
      articleUrl: "https://takeuforward.org/data-structure/coin-change-2-dp-22/"
    },
    {
      id: "sbstsm",
      title: "Subset Sum",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
      articleUrl: "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/"
    },
    {
      id: "rdctting",
      title: "Rod Cutting",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
      articleUrl: "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/"
    },
    {
      id: "ggdrpping",
      title: "Egg Dropping",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "wrdbrk",
      title: "Word Break",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/word-break/",
      articleUrl: ""
    },
    {
      id: "plindrmprtitiningmcmvritin",
      title: "Palindrome Partitioning (MCM Variation)",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "mximmprfitinjbschdling",
      title: "Maximum profit in Job scheduling",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },

    // Trie
    {
      id: "implmnttriprfixtr",
      title: "Implement Trie (Prefix Tree)",
      difficulty: "Hard",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
      articleUrl: "https://takeuforward.org/data-structure/implement-trie-1/"
    },
    {
      id: "implmnttri2prfixtr",
      title: "Implement Trie - 2 (Prefix Tree)",
      difficulty: "Hard",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/implement-trie-ii/"
    },
    {
      id: "lngststringwithllprfixs",
      title: "Longest String with All Prefixes",
      difficulty: "Medium",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: ""
    },
    {
      id: "nmbrfdistinctsbstringsinstring",
      title: "Number of Distinct Substrings in a String",
      difficulty: "Hard",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string-using-trie/"
    },
    {
      id: "pwrstthisisvryimprtnt",
      title: "Power Set (this is very important)",
      difficulty: "Medium",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "",
      articleUrl: "https://takeuforward.org/data-structure/power-set-print-all-the-possible-subsequences-of-the-string/"
    },
    {
      id: "mximmxrftwnmbrsinnrry",
      title: "Maximum XOR of two numbers in an array",
      difficulty: "Medium",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
      articleUrl: "https://takeuforward.org/data-structure/maximum-xor-of-two-numbers-in-an-array/"
    },
    {
      id: "mximmxrwithnlmntfrmrry",
      title: "Maximum XOR With an Element From Array",
      difficulty: "Hard",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
      articleUrl: "https://takeuforward.org/trie/maximum-xor-queries-trie/"
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMarkAsDone = (questionId) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isDone: !q.isDone } : q
    ));
  };

  const handleMarkForRevision = (questionId) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isMarkedForRevision: !q.isMarkedForRevision } : q
    ));
  };

  const handleAddNote = (question) => {
    setSelectedQuestion(question);
    setShowNoteModal(true);
  };

  const handleSaveNote = (note) => {
    setQuestions(questions.map(q =>
      q.id === selectedQuestion.id ? { ...q, note } : q
    ));
    setShowNoteModal(false);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Reset search when switching categories
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Get unique categories
  const getCategories = () => {
    const categoryMap = {};
    questions.forEach(q => {
      if (!categoryMap[q.category]) {
        categoryMap[q.category] = {
          name: q.category,
          total: 0,
          completed: 0,
          questions: []
        };
      }
      categoryMap[q.category].total++;
      categoryMap[q.category].questions.push(q);
      if (q.isDone) {
        categoryMap[q.category].completed++;
      }
    });
    return Object.values(categoryMap);
  };

  // Filter logic for questions in selected category
  const getFilteredQuestions = () => {
    if (!selectedCategory) return [];
    
    return questions.filter(q => {
      const matchesCategory = q.category === selectedCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    const matchesRevision = !showOnlyRevision || q.isMarkedForRevision;
    const matchesUnsolved = !showOnlyUnsolved || !q.isDone;
    
      return matchesCategory && matchesSearch && matchesDifficulty && matchesRevision && matchesUnsolved;
  });
  };

  const getStats = () => {
    const total = questions.length;
    const completed = questions.filter(q => q.isDone).length;
    const easy = questions.filter(q => q.difficulty === "Easy" && q.isDone).length;
    const medium = questions.filter(q => q.difficulty === "Medium" && q.isDone).length;
    const hard = questions.filter(q => q.difficulty === "Hard" && q.isDone).length;
    const totalEasy = questions.filter(q => q.difficulty === "Easy").length;
    const totalMedium = questions.filter(q => q.difficulty === "Medium").length;
    const totalHard = questions.filter(q => q.difficulty === "Hard").length;
    const progressPercent = total ? Math.round((completed / total) * 100) : 0;
    
    return { 
      total, completed, easy, medium, hard, 
      totalEasy, totalMedium, totalHard, progressPercent 
    };
  };

  const stats = getStats();
  const categories = getCategories();
  const filteredQuestions = getFilteredQuestions();

  // Category icon mapping
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Arrays': FiGrid,
      'Linked List': FiLayers,
      'Two Pointers': FiTarget,
      'Greedy': FiAward,
      'Recursion & Backtracking': FiArrowLeft,
      'Binary Search': FiSearch,
      'Heaps': FiTrendingUp,
      'Stack & Queue': FiBarChart2,
      'String': FiFileText,
      'Binary Tree': FiTarget,
      'Binary Search Tree': FiSearch,
      'Graph': FiGrid,
      'Dynamic Programming': FiTrendingUp,
      'Trie': FiHash,
    };
    return iconMap[categoryName] || FiHash;
  };

  return (
    <Layout 
      title={selectedCategory ? selectedCategory : "Dashboard"} 
      showSearch={true} 
      onSearch={setSearchQuery}
    >
      <div className="dashboard-content">
        {/* Enhanced Stats Section */}
        <section className="stats-section">
          <div className="stats-overview">
            <div className="main-progress-card">
              <div className="progress-header">
                <div className="progress-title">
                  <FiTarget className="title-icon" />
                  <div>
                    <h2>Overall Progress</h2>
                    <p>Keep pushing forward!</p>
                  </div>
                </div>
                <div className="progress-badge">
                  <FiAward />
                  <span>{stats.progressPercent}% Complete</span>
                </div>
              </div>
              
              <div className="progress-content">
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-number">{stats.completed}</span>
                    <span className="stat-label">Solved</span>
                  </div>
                  <div className="stat-divider">/</div>
                  <div className="stat-item">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total</span>
                  </div>
                </div>
                
                <div className="circular-progress">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" className="progress-bg" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      className="progress-fill"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 50}`,
                        strokeDashoffset: `${2 * Math.PI * 50 * (1 - stats.progressPercent / 100)}`
                      }}
                    />
                    <text x="60" y="65" className="progress-percentage">{stats.progressPercent}%</text>
                  </svg>
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill-bar" 
                  style={{ width: `${stats.progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="difficulty-breakdown">
            <div className="difficulty-cards">
              <div className="diff-card easy">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiCheckCircle />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Easy</span>
                    <span className="diff-count">{stats.easy}/{stats.totalEasy}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar easy" 
                    style={{ width: `${stats.totalEasy ? (stats.easy / stats.totalEasy) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="diff-card medium">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Medium</span>
                    <span className="diff-count">{stats.medium}/{stats.totalMedium}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar medium" 
                    style={{ width: `${stats.totalMedium ? (stats.medium / stats.totalMedium) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="diff-card hard">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiTrendingDown />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Hard</span>
                    <span className="diff-count">{stats.hard}/{stats.totalHard}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar hard" 
                    style={{ width: `${stats.totalHard ? (stats.hard / stats.totalHard) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories View */}
        {!selectedCategory ? (
          <section className="categories-section">
            <div className="categories-header">
              <h3>Study Topics</h3>
              <p>Select a topic to view questions</p>
              
            </div>
            
            <div className="categories-grid">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.name);
                const progressPercent = category.total ? Math.round((category.completed / category.total) * 100) : 0;
                
                return (
                  <div 
                    key={category.name} 
                    className="category-card"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="category-header">
                      <div className="category-icon">
                        <IconComponent />
                      </div>
                      <div className="category-info">
                        <h4 className="category-title">{category.name}</h4>
                        <p className="category-progress">
                          {category.completed}/{category.total} completed
                        </p>
                      </div>
                    </div>
                    
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    
                    <div className="category-stats">
                      <span className="progress-text">{progressPercent}% Complete</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          // Questions View for Selected Category
          <>
            {/* Back Button and Filters */}
            <section className="category-nav-section">
              <div className="nav-header">
                <button className="back-btn" onClick={handleBackToCategories}>
                  <FiArrowLeft />
                  <span>Back to Topics</span>
                </button>
                <h3>{selectedCategory} ({filteredQuestions.length} questions)</h3>
              </div>
              
          <div className="filter-group">
            <div className="difficulty-filters">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  className={`filter-btn ${filterDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
            
            <div className="toggle-filters">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showOnlyRevision}
                  onChange={(e) => setShowOnlyRevision(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">For Revision</span>
              </label>
              
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showOnlyUnsolved}
                  onChange={(e) => setShowOnlyUnsolved(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Unsolved Only</span>
              </label>
            </div>
          </div>
        </section>

        {/* Questions List */}
        <section className="questions-section">
          <div className="questions-list">
            {filteredQuestions.map((question) => (
              <div key={question.id} className={`question-card ${question.isDone ? 'completed' : ''}`}>
                <div className="question-main">
                  <button
                    className="status-btn"
                    onClick={() => handleMarkAsDone(question.id)}
                  >
                    {question.isDone ? <FiCheckCircle /> : <FiCircle />}
                  </button>
                  
                  <div className="question-info">
                    <h4 className="question-title">{question.title}</h4>
                    <span className={`difficulty-tag ${question.difficulty.toLowerCase()}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <div className="question-actions">
                    <a href={question.articleUrl} className="action-btn" title="View Article">
                      <FiFileText />
                    </a>
                    <a href={question.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="action-btn leetcode-btn" title="Open in LeetCode">
                      <LeetCodeIcon />
                    </a>
                    <button className="action-btn" onClick={() => handleCopyLink(question.leetcodeUrl)} title="Copy Link">
                      <FiCopy />
                    </button>
                    <button className="action-btn" onClick={() => handleAddNote(question)} title="Add Note">
                      <FiEdit />
                    </button>
                    <button
                      className={`action-btn ${question.isMarkedForRevision ? 'active' : ''}`}
                      onClick={() => handleMarkForRevision(question.id)}
                      title="Mark for Revision"
                    >
                      <FiBookmark />
                    </button>
                  </div>
                </div>
                
                {question.note && (
                  <div className="question-note">
                    <span className="note-text">{question.note}</span>
                  </div>
                )}
              </div>
            ))}
                
                {filteredQuestions.length === 0 && (
                  <div className="empty-state">
                    <p>No questions match your current filters.</p>
                  </div>
                )}
          </div>
        </section>
          </>
        )}
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Note</h3>
              <button className="close-btn" onClick={() => setShowNoteModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <textarea
                placeholder="Add your notes here..."
                defaultValue={selectedQuestion?.note}
                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, note: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowNoteModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => handleSaveNote(selectedQuestion.note)}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard; 