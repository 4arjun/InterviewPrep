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
import { motion } from 'framer-motion';

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

    // NeetCode150 Additional Questions
    {
      id: "duplicate-integer",
      title: "Contains Duplicate",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
      articleUrl: ""
    },
    {
      id: "string-encode-and-decode",
      title: "Encode and Decode Strings",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/encode-and-decode-strings/",
      articleUrl: ""
    },
    {
      id: "count-connected-components",
      title: "Number of Connected Components in an Undirected Graph",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
      articleUrl: ""
    },
    {
      id: "valid-tree",
      title: "Graph Valid Tree",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/",
      articleUrl: ""
    },
    {
      id: "foreign-dictionary",
      title: "Alien Dictionary",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
      articleUrl: ""
    },
    {
      id: "meeting-schedule",
      title: "Meeting Rooms",
      difficulty: "Easy",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/",
      articleUrl: ""
    },
    {
      id: "meeting-schedule-ii",
      title: "Meeting Rooms II",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
      articleUrl: ""
    },
    {
      id: "is-palindrome",
      title: "Valid Palindrome",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
      articleUrl: ""
    },
    {
      id: "islands-and-treasure",
      title: "Islands and Treasure",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/walls-and-gates/",
      articleUrl: ""
    },
    {
      id: "find-minimum-in-rotated-sorted-array",
      title: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      articleUrl: ""
    },
    {
      id: "invert-a-binary-tree",
      title: "Invert Binary Tree",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
      articleUrl: ""
    },
    {
      id: "climbing-stairs",
      title: "Climbing Stairs",
      difficulty: "Easy",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
      articleUrl: ""
    },
    {
      id: "insert-new-interval",
      title: "Insert Interval",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
      articleUrl: ""
    },
    {
      id: "number-of-one-bits",
      title: "Number of One Bits",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
      articleUrl: ""
    },
    {
      id: "products-of-array-discluding-self",
      title: "Product of Array Except Self",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
      articleUrl: ""
    },
    {
      id: "max-water-container",
      title: "Container With Most Water",
      difficulty: "Medium",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
      articleUrl: ""
    },
    {
      id: "longest-repeating-substring-with-replacement",
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      articleUrl: ""
    },
    {
      id: "minimum-window-with-characters",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
      articleUrl: ""
    },
    {
      id: "reorder-linked-list",
      title: "Reorder Linked List",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
      articleUrl: ""
    },
    {
      id: "merge-k-sorted-linked-lists",
      title: "Merge K Sorted Linked Lists",
      difficulty: "Hard",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
      articleUrl: ""
    },
    {
      id: "subtree-of-a-binary-tree",
      title: "Subtree of Another Tree",
      difficulty: "Easy",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
      articleUrl: ""
    },
    {
      id: "design-word-search-data-structure",
      title: "Design Add and Search Word Data Structure",
      difficulty: "Medium",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      articleUrl: ""
    },
    {
      id: "search-for-word",
      title: "Word Search",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/word-search/",
      articleUrl: ""
    },
    {
      id: "search-for-word-ii",
      title: "Word Search II",
      difficulty: "Hard",
      category: "Trie",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
      articleUrl: ""
    },
    {
      id: "pacific-atlantic-water-flow",
      title: "Pacific Atlantic Water Flow",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
      articleUrl: ""
    },
    {
      id: "course-schedule",
      title: "Course Schedule",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      articleUrl: ""
    },
    {
      id: "house-robber",
      title: "House Robber",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/house-robber/",
      articleUrl: ""
    },
    {
      id: "house-robber-ii",
      title: "House Robber II",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
      articleUrl: ""
    },
    {
      id: "palindromic-substrings",
      title: "Palindromic Substrings",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
      articleUrl: ""
    },
    {
      id: "decode-ways",
      title: "Decode Ways",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
      articleUrl: ""
    },
    {
      id: "jump-game",
      title: "Jump Game",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/jump-game/",
      articleUrl: ""
    },
    {
      id: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
      articleUrl: ""
    },
    {
      id: "spiral-matrix",
      title: "Spiral Matrix",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
      articleUrl: ""
    },
    {
      id: "counting-bits",
      title: "Counting Bits",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
      articleUrl: ""
    },
    {
      id: "reverse-bits",
      title: "Reverse Bits",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
      articleUrl: ""
    },
    {
      id: "missing-number",
      title: "Missing Number",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/missing-number/",
      articleUrl: ""
    },
    {
      id: "sum-of-two-integers",
      title: "Sum of Two Integers",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/",
      articleUrl: ""
    },
    {
      id: "anagram-groups",
      title: "Group Anagrams",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
      articleUrl: ""
    },
    {
      id: "valid-sudoku",
      title: "Valid Sudoku",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
      articleUrl: ""
    },
    {
      id: "two-integer-sum-ii",
      title: "Two Sum II - Input Array Is Sorted",
      difficulty: "Medium",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      articleUrl: ""
    },
    {
      id: "permutation-string",
      title: "Permutation in String",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
      articleUrl: ""
    },
    {
      id: "evaluate-reverse-polish-notation",
      title: "Evaluate Reverse Polish Notation",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      articleUrl: ""
    },
    {
      id: "generate-parentheses",
      title: "Generate Parentheses",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
      articleUrl: ""
    },
    {
      id: "daily-temperatures",
      title: "Daily Temperatures",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
      articleUrl: ""
    },
    {
      id: "car-fleet",
      title: "Car Fleet",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/car-fleet/",
      articleUrl: ""
    },
    {
      id: "binary-search",
      title: "Binary Search",
      difficulty: "Easy",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-search/",
      articleUrl: ""
    },
    {
      id: "eating-bananas",
      title: "Koko Eating Bananas",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      articleUrl: ""
    },
    {
      id: "time-based-key-value-store",
      title: "Time Based Key-Value Store",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/time-based-key-value-store/",
      articleUrl: ""
    },
    {
      id: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
      articleUrl: ""
    },
    {
      id: "count-good-nodes-in-binary-tree",
      title: "Count Good Nodes in Binary Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
      articleUrl: ""
    },
    {
      id: "kth-largest-integer-in-a-stream",
      title: "Kth Largest Element in a Stream",
      difficulty: "Easy",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
      articleUrl: ""
    },
    {
      id: "last-stone-weight",
      title: "Last Stone Weight",
      difficulty: "Easy",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/",
      articleUrl: ""
    },
    {
      id: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
      articleUrl: ""
    },
    {
      id: "task-scheduling",
      title: "Task Scheduler",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
      articleUrl: ""
    },
    {
      id: "design-twitter-feed",
      title: "Design Twitter",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
      articleUrl: ""
    },
    {
      id: "subsets",
      title: "Subsets",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/subsets/",
      articleUrl: ""
    },
    {
      id: "combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      articleUrl: ""
    },
    {
      id: "max-area-of-island",
      title: "Max Area of Island",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/max-area-of-island/",
      articleUrl: ""
    },
    {
      id: "surrounded-regions",
      title: "Surrounded Regions",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
      articleUrl: ""
    },
    {
      id: "course-schedule-ii",
      title: "Course Schedule II",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
      articleUrl: ""
    },
    {
      id: "redundant-connection",
      title: "Redundant Connection",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
      articleUrl: ""
    },
    {
      id: "word-ladder",
      title: "Word Ladder",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
      articleUrl: ""
    },
    {
      id: "reconstruct-flight-path",
      title: "Reconstruct Itinerary",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reconstruct-itinerary/",
      articleUrl: ""
    },
    {
      id: "min-cost-to-connect-points",
      title: "Min Cost to Connect All Points",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      articleUrl: ""
    },
    {
      id: "network-delay-time",
      title: "Network Delay Time",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      articleUrl: ""
    },
    {
      id: "swim-in-rising-water",
      title: "Swim in Rising Water",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/swim-in-rising-water/",
      articleUrl: ""
    },
    {
      id: "cheapest-flight-path",
      title: "Cheapest Flights Within K Stops",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      articleUrl: ""
    },
    {
      id: "min-cost-climbing-stairs",
      title: "Min Cost Climbing Stairs",
      difficulty: "Easy",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
      articleUrl: ""
    },
    {
      id: "buy-and-sell-crypto-with-cooldown",
      title: "Best Time to Buy and Sell Stock with Cooldown",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      articleUrl: ""
    },
    {
      id: "coin-change-ii",
      title: "Coin Change II",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/coin-change-2/",
      articleUrl: ""
    },
    {
      id: "target-sum",
      title: "Target Sum",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/target-sum/",
      articleUrl: ""
    },
    {
      id: "interleaving-string",
      title: "Interleaving String",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
      articleUrl: ""
    },
    {
      id: "longest-increasing-path-in-matrix",
      title: "Longest Increasing Path in a Matrix",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
      articleUrl: ""
    },
    {
      id: "count-subsequences",
      title: "Distinct Subsequences",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
      articleUrl: ""
    },
    {
      id: "burst-balloons",
      title: "Burst Balloons",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
      articleUrl: ""
    },
    {
      id: "regular-expression-matching",
      title: "Regular Expression Matching",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
      articleUrl: ""
    },
    {
      id: "jump-game-ii",
      title: "Jump Game II",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
      articleUrl: ""
    },
    {
      id: "gas-station",
      title: "Gas Station",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      articleUrl: ""
    },
    {
      id: "hand-of-straights",
      title: "Hand of Straights",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/",
      articleUrl: ""
    },
    {
      id: "merge-triplets-to-form-target",
      title: "Merge Triplets to Form Target Triplet",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
      articleUrl: ""
    },
    {
      id: "partition-labels",
      title: "Partition Labels",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/partition-labels/",
      articleUrl: ""
    },
    {
      id: "valid-parenthesis-string",
      title: "Valid Parenthesis String",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/",
      articleUrl: ""
    },
    {
      id: "minimum-interval-including-query",
      title: "Minimum Interval to Include Each Query",
      difficulty: "Hard",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
      articleUrl: ""
    },
    {
      id: "non-cyclical-number",
      title: "Happy Number",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/happy-number/",
      articleUrl: ""
    },
    {
      id: "plus-one",
      title: "Plus One",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/plus-one/",
      articleUrl: ""
    },
    {
      id: "multiply-strings",
      title: "Multiply Strings",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/multiply-strings/",
      articleUrl: ""
    },
    {
      id: "count-squares",
      title: "Detect Squares",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/detect-squares/",
      articleUrl: ""
    },
    {
      id: "single-number",
      title: "Single Number",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/single-number/",
      articleUrl: ""
    },
    {
      id: "reverse-integer",
      title: "Reverse Integer",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
      articleUrl: ""
    },
    {
      id: "minimum-remove-to-make-valid-parentheses",
      title: "Minimum Remove to Make Valid Parentheses",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
      articleUrl: ""
    },
    {
      id: "valid-palindrome-ii",
      title: "Valid Palindrome II",
      difficulty: "Easy",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-palindrome-ii/",
      articleUrl: ""
    },
    {
      id: "valid-word-abbreviation",
      title: "Valid Word Abbreviation",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-word-abbreviation/",
      articleUrl: ""
    },
    {
      id: "buildings-with-an-ocean-view",
      title: "Buildings With an Ocean View",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/buildings-with-an-ocean-view/",
      articleUrl: ""
    },
    {
      id: "reorganize-string",
      title: "Reorganize String",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reorganize-string/",
      articleUrl: ""
    },
    {
      id: "put-marbles-in-bags",
      title: "Put Marbles in Bags",
      difficulty: "Hard",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/put-marbles-in-bags/",
      articleUrl: ""
    },
    {
      id: "analyze-user-website-visit-pattern",
      title: "Analyze User Website Visit Pattern",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/analyze-user-website-visit-pattern/",
      articleUrl: ""
    },
    {
      id: "merge-strings-alternately",
      title: "Merge Strings Alternately",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/merge-strings-alternately/",
      articleUrl: ""
    },
    {
      id: "concatenation-of-array",
      title: "Concatenation of Array",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/concatenation-of-array/",
      articleUrl: ""
    },
    {
      id: "remove-element",
      title: "Remove Element",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/remove-element/",
      articleUrl: ""
    },
    {
      id: "sort-an-array",
      title: "Sort an Array",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sort-an-array/",
      articleUrl: ""
    },
    {
      id: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
      articleUrl: ""
    },
    {
      id: "best-time-to-buy-and-sell-stock-ii",
      title: "Best Time to Buy and Sell Stock II",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
      articleUrl: ""
    },
    {
      id: "rotate-array",
      title: "Rotate Array",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
      articleUrl: ""
    },
    {
      id: "first-missing-positive",
      title: "First Missing Positive",
      difficulty: "Hard",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
      articleUrl: ""
    },
    {
      id: "boats-to-save-people",
      title: "Boats to Save People",
      difficulty: "Medium",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/boats-to-save-people/",
      articleUrl: ""
    },
    {
      id: "reverse-string",
      title: "Reverse String",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-string/",
      articleUrl: ""
    },
    {
      id: "contains-duplicate-ii",
      title: "Contains Duplicate II",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/contains-duplicate-ii/",
      articleUrl: ""
    },
    {
      id: "minimum-size-subarray-sum",
      title: "Minimum Size Subarray Sum",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      articleUrl: ""
    },
    {
      id: "find-k-closest-elements",
      title: "Find K Closest Elements",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-k-closest-elements/",
      articleUrl: ""
    },
    {
      id: "search-insert-position",
      title: "Search Insert Position",
      difficulty: "Easy",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
      articleUrl: ""
    },
    {
      id: "sqrtx",
      title: "Sqrt(x)",
      difficulty: "Easy",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sqrtx/",
      articleUrl: ""
    },
    {
      id: "capacity-to-ship-packages-within-d-days",
      title: "Capacity to Ship Packages Within D Days",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      articleUrl: ""
    },
    {
      id: "search-in-rotated-sorted-array-ii",
      title: "Search in Rotated Sorted Array II",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      articleUrl: ""
    },
    {
      id: "split-array-largest-sum",
      title: "Split Array Largest Sum",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/",
      articleUrl: ""
    },
    {
      id: "guess-number-higher-or-lower",
      title: "Guess Number Higher or Lower",
      difficulty: "Easy",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/guess-number-higher-or-lower/",
      articleUrl: ""
    },
    {
      id: "find-in-mountain-array",
      title: "Find in Mountain Array",
      difficulty: "Hard",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-in-mountain-array/",
      articleUrl: ""
    },
    {
      id: "baseball-game",
      title: "Baseball Game",
      difficulty: "Easy",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/baseball-game/",
      articleUrl: ""
    },
    {
      id: "asteroid-collision",
      title: "Asteroid Collision",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
      articleUrl: ""
    },
    {
      id: "simplify-path",
      title: "Simplify Path",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/simplify-path/",
      articleUrl: ""
    },
    {
      id: "decode-string",
      title: "Decode String",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/decode-string/",
      articleUrl: ""
    },
    {
      id: "reverse-linked-list-ii",
      title: "Reverse Linked List II",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/",
      articleUrl: ""
    },
    {
      id: "house-robber-iii",
      title: "House Robber III",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/house-robber-iii/",
      articleUrl: ""
    },
    {
      id: "delete-leaves-with-a-given-value",
      title: "Delete Leaves With a Given Value",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/delete-leaves-with-a-given-value/",
      articleUrl: ""
    },
    {
      id: "construct-quad-tree",
      title: "Construct Quad Tree",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/construct-quad-tree/",
      articleUrl: ""
    },
    {
      id: "insert-into-a-binary-search-tree",
      title: "Insert into a Binary Search Tree",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      articleUrl: ""
    },
    {
      id: "delete-node-in-a-bst",
      title: "Delete Node in a BST",
      difficulty: "Medium",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
      articleUrl: ""
    },
    {
      id: "single-threaded-cpu",
      title: "Single-Threaded CPU",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/single-threaded-cpu/",
      articleUrl: ""
    },
    {
      id: "longest-happy-string",
      title: "Longest Happy String",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-happy-string/",
      articleUrl: ""
    },
    {
      id: "car-pooling",
      title: "Car Pooling",
      difficulty: "Medium",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/car-pooling/",
      articleUrl: ""
    },
    {
      id: "ipo",
      title: "IPO",
      difficulty: "Hard",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/ipo/",
      articleUrl: ""
    },
    {
      id: "sum-of-all-subset-xor-totals",
      title: "Sum of All Subset XOR Totals",
      difficulty: "Easy",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sum-of-all-subset-xor-totals/",
      articleUrl: ""
    },
    {
      id: "combinations",
      title: "Combinations",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/combinations/",
      articleUrl: ""
    },
    {
      id: "permutations-ii",
      title: "Permutations II",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/permutations-ii/",
      articleUrl: ""
    },
    {
      id: "matchsticks-to-square",
      title: "Matchsticks to Square",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/matchsticks-to-square/",
      articleUrl: ""
    },
    {
      id: "partition-to-k-equal-sum-subsets",
      title: "Partition to K Equal Sum Subsets",
      difficulty: "Medium",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
      articleUrl: ""
    },
    {
      id: "n-queens-ii",
      title: "N-Queens II",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/n-queens-ii/",
      articleUrl: ""
    },
    {
      id: "word-break-ii",
      title: "Word Break II",
      difficulty: "Hard",
      category: "Recursion & Backtracking",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/word-break-ii/",
      articleUrl: ""
    },
    {
      id: "extra-characters-in-a-string",
      title: "Extra Characters in a String",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/extra-characters-in-a-string/",
      articleUrl: ""
    },
    {
      id: "island-perimeter",
      title: "Island Perimeter",
      difficulty: "Easy",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/island-perimeter/",
      articleUrl: ""
    },
    {
      id: "verifying-an-alien-dictionary",
      title: "Verifying an Alien Dictionary",
      difficulty: "Easy",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/verifying-an-alien-dictionary/",
      articleUrl: ""
    },
    {
      id: "find-the-town-judge",
      title: "Find the Town Judge",
      difficulty: "Easy",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-the-town-judge/",
      articleUrl: ""
    },
    {
      id: "open-the-lock",
      title: "Open the Lock",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/open-the-lock/",
      articleUrl: ""
    },
    {
      id: "course-schedule-iv",
      title: "Course Schedule IV",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule-iv/",
      articleUrl: ""
    },
    {
      id: "accounts-merge",
      title: "Accounts Merge",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/accounts-merge/",
      articleUrl: ""
    },
    {
      id: "evaluate-division",
      title: "Evaluate Division",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/evaluate-division/",
      articleUrl: ""
    },
    {
      id: "path-with-minimum-effort",
      title: "Path with Minimum Effort",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/path-with-minimum-effort/",
      articleUrl: ""
    },
    {
      id: "greatest-common-divisor-traversal",
      title: "Greatest Common Divisor Traversal",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/greatest-common-divisor-traversal/",
      articleUrl: ""
    },
    {
      id: "n-th-tribonacci-number",
      title: "N-th Tribonacci Number",
      difficulty: "Easy",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/n-th-tribonacci-number/",
      articleUrl: ""
    },
    {
      id: "combination-sum-iv",
      title: "Combination Sum IV",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum-iv/",
      articleUrl: ""
    },
    {
      id: "perfect-squares",
      title: "Perfect Squares",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/perfect-squares/",
      articleUrl: ""
    },
    {
      id: "integer-break",
      title: "Integer Break",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/integer-break/",
      articleUrl: ""
    },
    {
      id: "stone-game-iii",
      title: "Stone Game III",
      difficulty: "Hard",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/stone-game-iii/",
      articleUrl: ""
    },
    {
      id: "unique-paths-ii",
      title: "Unique Paths II",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
      articleUrl: ""
    },
    {
      id: "last-stone-weight-ii",
      title: "Last Stone Weight II",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/last-stone-weight-ii/",
      articleUrl: ""
    },
    {
      id: "stone-game",
      title: "Stone Game",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/stone-game/",
      articleUrl: ""
    },
    {
      id: "stone-game-ii",
      title: "Stone Game II",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/stone-game-ii/",
      articleUrl: ""
    },
    {
      id: "jump-game-vii",
      title: "Jump Game VII",
      difficulty: "Medium",
      category: "Dynamic Programming",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-vii/",
      articleUrl: ""
    },
    {
      id: "lemonade-change",
      title: "Lemonade Change",
      difficulty: "Easy",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lemonade-change/",
      articleUrl: ""
    },
    {
      id: "dota2-senate",
      title: "Dota2 Senate",
      difficulty: "Medium",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/dota2-senate/",
      articleUrl: ""
    },
    {
      id: "candy",
      title: "Candy",
      difficulty: "Hard",
      category: "Greedy",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/candy/",
      articleUrl: ""
    },
    {
      id: "meeting-rooms-iii",
      title: "Meeting Rooms III",
      difficulty: "Hard",
      category: "Heaps",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-iii/",
      articleUrl: ""
    },
    {
      id: "maximum-sum-circular-subarray",
      title: "Maximum Sum Circular Subarray",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
      articleUrl: ""
    },
    {
      id: "longest-turbulent-subarray",
      title: "Longest Turbulent Subarray",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-turbulent-subarray/",
      articleUrl: ""
    },
    {
      id: "transpose-matrix",
      title: "Transpose Matrix",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/transpose-matrix/",
      articleUrl: ""
    },
    {
      id: "bitwise-and-of-numbers-range",
      title: "Bitwise AND of Numbers Range",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
      articleUrl: ""
    },
    {
      id: "minimum-array-end",
      title: "Minimum Array End",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-array-end/",
      articleUrl: ""
    },
    {
      id: "design-hashset",
      title: "Design HashSet",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/design-hashset/",
      articleUrl: ""
    },
    {
      id: "design-hashmap",
      title: "Design HashMap",
      difficulty: "Easy",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/design-hashmap/",
      articleUrl: ""
    },
    {
      id: "range-sum-query-2d-immutable",
      title: "Range Sum Query 2D - Immutable",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
      articleUrl: ""
    },
    {
      id: "longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit",
      title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/",
      articleUrl: ""
    },
    {
      id: "rotating-the-box",
      title: "Rotating the Box",
      difficulty: "Medium",
      category: "Arrays",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/rotating-the-box/",
      articleUrl: ""
    },
    {
      id: "squares-of-a-sorted-array",
      title: "Squares of a Sorted Array",
      difficulty: "Easy",
      category: "Two Pointers",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/squares-of-a-sorted-array/",
      articleUrl: ""
    },
    {
      id: "excel-sheet-column-title",
      title: "Excel Sheet Column Title",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/excel-sheet-column-title/",
      articleUrl: ""
    },
    {
      id: "greatest-common-divisor-of-strings",
      title: "Greatest Common Divisor of Strings",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
      articleUrl: ""
    },
    {
      id: "add-binary",
      title: "Add Binary",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/add-binary/",
      articleUrl: ""
    },
    {
      id: "palindrome-number",
      title: "Palindrome Number",
      difficulty: "Easy",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
      articleUrl: ""
    },
    {
      id: "zigzag-conversion",
      title: "Zigzag Conversion",
      difficulty: "Medium",
      category: "String",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/zigzag-conversion/",
      articleUrl: ""
    },
    {
      id: "insert-greatest-common-divisors-in-linked-list",
      title: "Insert Greatest Common Divisors in Linked List",
      difficulty: "Medium",
      category: "Linked List",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/",
      articleUrl: ""
    },
    {
      id: "find-peak-element",
      title: "Find Peak Element",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-peak-element/",
      articleUrl: ""
    },
    {
      id: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium",
      category: "Binary Search",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      articleUrl: ""
    },
    {
      id: "design-circular-queue",
      title: "Design Circular Queue",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/design-circular-queue/",
      articleUrl: ""
    },
    {
      id: "maximum-frequency-stack",
      title: "Maximum Frequency Stack",
      difficulty: "Hard",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/maximum-frequency-stack/",
      articleUrl: ""
    },
    {
      id: "basic-calculator-ii",
      title: "Basic Calculator II",
      difficulty: "Medium",
      category: "Stack & Queue",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/basic-calculator-ii/",
      articleUrl: ""
    },
    {
      id: "sum-root-to-leaf-numbers",
      title: "Sum Root to Leaf Numbers",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
      articleUrl: ""
    },
    {
      id: "lowest-common-ancestor-of-a-binary-tree-iii",
      title: "Lowest Common Ancestor of a Binary Tree III",
      difficulty: "Medium",
      category: "Binary Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/",
      articleUrl: ""
    },
    {
      id: "range-sum-of-bst",
      title: "Range Sum of BST",
      difficulty: "Easy",
      category: "Binary Search Tree",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/range-sum-of-bst/",
      articleUrl: ""
    },
    {
      id: "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree",
      title: "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/",
      articleUrl: ""
    },
    {
      id: "build-a-matrix-with-conditions",
      title: "Build a Matrix With Conditions",
      difficulty: "Hard",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/build-a-matrix-with-conditions/",
      articleUrl: ""
    },
    {
      id: "minimum-height-trees",
      title: "Minimum Height Trees",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/minimum-height-trees/",
      articleUrl: ""
    },
    {
      id: "shortest-path-in-binary-matrix",
      title: "Shortest Path in Binary Matrix",
      difficulty: "Medium",
      category: "Graph",
      isMarkedForRevision: false,
      isDone: false,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      articleUrl: ""
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
              {categories.map((category, index) => {
                const IconComponent = getCategoryIcon(category.name);
                const progressPercent = category.total ? Math.round((category.completed / category.total) * 100) : 0;
                
                return (
                  <motion.div 
                    key={category.name}
                    className="category-card"
                    onClick={() => handleCategoryClick(category.name)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(99,102,241,0.2)' }}
                    transition={{ duration: 0.5, delay: 0.08 * index }}
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
                  </motion.div>
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