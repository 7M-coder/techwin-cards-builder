import { useState, useEffect, useRef, useCallback } from "react";
import { Shuffle, RotateCcw, Download } from "lucide-react";
import GreetingCards from "./GreetingCards";

const SVG_B64 =
  "PHN2ZyB3aWR0aD0iMzE5IiBoZWlnaHQ9IjUwNiIgdmlld0JveD0iMCAwIDMxOSA1MDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMjlfMjM2KSI+CjxyZWN0IHdpZHRoPSIzMTkiIGhlaWdodD0iNTA2IiBmaWxsPSIjMEQwRDBEIi8+CjxwYXRoIGQ9Ik0yODkuNDIgMzJIMjcyLjYxM0MyNzAuODU1IDMyIDI2OS40MyAzMy40MjUxIDI2OS40MyAzNS4xODMxVjM4LjQyNTZDMjY5LjQzIDQwLjE4MzYgMjcwLjg1NSA0MS42MDg3IDI3Mi42MTMgNDEuNjA4N0gyODkuNDJDMjkxLjE3OCA0MS42MDg3IDI5Mi42MDMgNDAuMTgzNiAyOTIuNjAzIDM4LjQyNTZWMzUuMTgzMUMyOTIuNjAzIDMzLjQyNTEgMjkxLjE3OCAzMiAyODkuNDIgMzJaIiBmaWxsPSIjN0EzQkYxIi8+CjxwYXRoIGQ9Ik0yOTkuODE2IDMyLjAzMDNIMjk2LjYzNEMyOTQuODc2IDMyLjAzMDMgMjkzLjQ1MSAzMy40NTU0IDI5My40NTEgMzUuMjEzNFYzOC4zOTU2QzI5My40NTEgNDAuMTUzNSAyOTQuODc2IDQxLjU3ODcgMjk2LjYzNCA0MS41Nzg3SDI5OS44MTZDMzAxLjU3NCA0MS41Nzg3IDMwMyA0MC4xNTM1IDMwMyAzOC4zOTU2VjM1LjIxMzRDMzAzIDMzLjQ1NTQgMzAxLjU3NCAzMi4wMzAzIDI5OS44MTYgMzIuMDMwM1oiIGZpbGw9IiMwM0JGRDMiLz4KPHBhdGggZD0iTTI3OC45NzggNDIuNDU1NkgyNzIuNjEzQzI3MC44NTUgNDIuNDU1NiAyNjkuNDMgNDMuODgwNyAyNjkuNDMgNDUuNjM4N1Y0OC44MjA5QzI2OS40MyA1MC41Nzg4IDI3MC44NTUgNTIuMDA0IDI3Mi42MTMgNTIuMDA0SDI3OC45NzhDMjgwLjczNiA1Mi4wMDQgMjgyLjE2MSA1MC41Nzg4IDI4Mi4xNjEgNDguODIwOVY0NS42Mzg3QzI4Mi4xNjEgNDMuODgwNyAyODAuNzM2IDQyLjQ1NTYgMjc4Ljk3OCA0Mi40NTU2WiIgZmlsbD0iI0ZGNDUwMCIvPgo8cGF0aCBkPSJNMjg5LjM3NSA0Mi40NTU4SDI4Ni4xOTNDMjg0LjQzNSA0Mi40NTU4IDI4My4wMSA0My44ODA5IDI4My4wMSA0NS42Mzg5VjQ4LjgyMTFDMjgzLjAxIDUwLjU3OTEgMjg0LjQzNSA1Mi4wMDQyIDI4Ni4xOTMgNTIuMDA0MkgyODkuMzc1QzI5MS4xMzMgNTIuMDA0MiAyOTIuNTU4IDUwLjU3OTEgMjkyLjU1OCA0OC44MjExVjQ1LjYzODlDMjkyLjU1OCA0My44ODA5IDI5MS4xMzMgNDIuNDU1OCAyODkuMzc1IDQyLjQ1NThaIiBmaWxsPSIjRjJDMjAwIi8+CjxwYXRoIGQ9Ik0yOTguMTggNDIuNDU1NkMzMDAuODE3IDQyLjQ1NTYgMzAyLjk1NSA0NC41OTMgMzAyLjk1NSA0Ny4yMjk4QzMwMi45NTUgNDkuODY2NSAzMDAuODE3IDUyLjAwNCAyOTguMTggNTIuMDA0QzI5NS41NDQgNTIuMDA0IDI5My40MDYgNDkuODY2NSAyOTMuNDA2IDQ3LjIyOThDMjkzLjQwNiA0NC41OTMgMjk1LjU0NCA0Mi40NTU2IDI5OC4xOCA0Mi40NTU2WiIgZmlsbD0iI0YyQzIwMCIvPgo8cGF0aCBkPSJNMjk5LjY2NyA1Mi44NTNIMjcyLjYxM0MyNzAuODU1IDUyLjg1MyAyNjkuNDMgNTQuMjc4MSAyNjkuNDMgNTYuMDM2MVY1OS4yMTgzQzI2OS40MyA2MC45NzYzIDI3MC44NTUgNjIuNDAxNCAyNzIuNjEzIDYyLjQwMTRIMjk5LjY2N0MzMDEuNDI1IDYyLjQwMTQgMzAyLjg1IDYwLjk3NjMgMzAyLjg1IDU5LjIxODNWNTYuMDM2MUMzMDIuODUgNTQuMjc4MSAzMDEuNDI1IDUyLjg1MyAyOTkuNjY3IDUyLjg1M1oiIGZpbGw9IiNGRjQ1MDAiLz4KPHBhdGggZD0iTTIwNy41NzcgMzYuMTQ4M0MyMDguMTU4IDM2LjE0ODMgMjA4LjQ0OSAzNS44NDU5IDIwOC40NDkgMzUuMjQwMUMyMDguNDQ5IDM0LjYzNDQgMjA4LjE1OCAzNC4zNTA2IDIwNy41NzcgMzQuMzUwNkMyMDYuOTk2IDM0LjM1MDYgMjA2LjY4OCAzNC42NDc3IDIwNi42ODggMzUuMjQwMUMyMDYuNjg4IDM1LjgzMjYgMjA2Ljk4NCAzNi4xNDgzIDIwNy41NzcgMzYuMTQ4M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTcuNTc5IDQ2LjE1MjZDMjE2Ljk4NiA0Ni4xNTI2IDIxNi42ODkgNDYuNDQ4OCAyMTYuNjg5IDQ3LjA0MjJDMjE2LjY4OSA0Ny42MzU1IDIxNi45ODYgNDcuOTUwMyAyMTcuNTc5IDQ3Ljk1MDNDMjE4LjE3MiA0Ny45NTAzIDIxOC40NTEgNDcuNjQ3OSAyMTguNDUxIDQ3LjA0MjJDMjE4LjQ1MSA0Ni40MzY0IDIxOC4xNiA0Ni4xNTI2IDIxNy41NzkgNDYuMTUyNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTcuMjg5IDQxLjA1MTFDMjE3LjI4OSA0Mi4yNjE3IDIxNi42OTYgNDIuODY2NiAyMTUuNTEgNDIuODY2NkgyMTQuMjAyQzIxMy4wMTYgNDIuODY2NiAyMTIuNDIzIDQyLjI2MTcgMjEyLjQyMyA0MS4wNTExVjM2LjQ1NzhMMjEwLjg2MSAzNy4yOTMzVjQzLjM1N0MyMTAuODYxIDQ0LjE5MjUgMjEwLjYxOSA0NC44NzAxIDIxMC4xMzUgNDUuMzkwN0MyMDkuNTU0IDQ2LjAwOCAyMDguNzMxIDQ2LjMxNjYgMjA3LjY2NiA0Ni4zMTY2QzIwNi43NDYgNDYuMzE2NiAyMDUuOTkgNDYuMDE0MiAyMDUuMzk2IDQ1LjQwODRDMjA0Ljc2NyA0NC43NTQ4IDIwNC40NTIgNDMuOTE5MyAyMDQuNDUyIDQyLjkwMjlDMjA0LjQ1MiA0MS44ODY2IDIwNC43MjQgNDAuOTg0NiAyMDUuMjY5IDQwLjEyNTJMMjAzLjc2MiA0MC40NTE1QzIwMy4yNTUgNDEuMTc3OSAyMDMgNDIuMDQ5NyAyMDMgNDMuMDY2MUMyMDMgNDQuMjQwNCAyMDMuMzMzIDQ1LjI1NjggMjAzLjk5OSA0Ni4xMTYyQzIwNC44NyA0Ny4yMjkzIDIwNi4wOTMgNDcuNzg2MiAyMDcuNjY2IDQ3Ljc4NjJDMjA4LjkwMSA0Ny43ODYyIDIwOS45MzYgNDcuNDcxNCAyMTAuNzcxIDQ2Ljg0MTdDMjExLjcwMyA0Ni4xNTE3IDIxMi4yNDIgNDUuMTg5NCAyMTIuMzg3IDQzLjk1NDhDMjEyLjg0NiA0NC4yMDk0IDIxMy4zOTIgNDQuMzM2MiAyMTQuMDIxIDQ0LjMzNjJIMjE1LjY5MUMyMTYuNjEgNDQuMzM2MiAyMTcuMzU1IDQ0LjA3MDEgMjE3LjkyNCA0My41MzcxQzIxOC41NDEgNDIuOTQ0NiAyMTguODUgNDIuMTMzMSAyMTguODUgNDEuMTA0M1YzNi40NTYxTDIxNy4yODggMzcuMjkxNVY0MS4wNTAyTDIxNy4yODkgNDEuMDUxMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTYuMTQ0IDQ3LjA0MjJDMjE2LjE0NCA0Ni40NDg4IDIxNS44NTMgNDYuMTUyNiAyMTUuMjcyIDQ2LjE1MjZDMjE0LjY5MSA0Ni4xNTI2IDIxNC4zODMgNDYuNDQ4OCAyMTQuMzgzIDQ3LjA0MjJDMjE0LjM4MyA0Ny42MzU1IDIxNC42OCA0Ny45NTAzIDIxNS4yNzIgNDcuOTUwM0MyMTUuODY1IDQ3Ljk1MDMgMjE2LjE0NCA0Ny42NDc5IDIxNi4xNDQgNDcuMDQyMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNjEuMzE3IDQxLjA1MTJDMjYxLjMxNyA0Mi4yNjE5IDI2MC43MjQgNDIuODY2NyAyNTkuNTM4IDQyLjg2NjdIMjU4LjM5NEMyNTcuMjIgNDIuODY2NyAyNTYuNjMyIDQyLjI2MTkgMjU2LjYzMiA0MS4wNTEyVjQwLjg1MTdDMjU2LjYzMiAzOS42NjU5IDI1Ni4yNTEgMzguNjg1IDI1NS40ODggMzcuOTEwN0MyNTQuNjQxIDM3LjA3NTMgMjUzLjUyNyAzNi42NTg0IDI1Mi4xNDcgMzYuNjU4NEgyNTIuMDM4TDI1NS42MTUgMzIuNjI3NEgyNTQuMDE4TDI1MC4wNDIgMzcuMDM5OFYzOC41ODNDMjUwLjY4MyAzOC4zNDA5IDI1MS4zMjQgMzguMjIwMiAyNTEuOTY2IDM4LjIyMDJDMjUyLjc3NyAzOC4yMjAyIDI1My40NjEgMzguNDEzNiAyNTQuMDE4IDM4LjgwMTJDMjU0LjcxOSAzOS4yNzMgMjU1LjA3MSAzOS45NjMgMjU1LjA3MSA0MC44NzEyVjQxLjAzNDRDMjU1LjA3MSA0Mi4yNTc0IDI1NC40OSA0Mi44Njg1IDI1My4zMjggNDIuODY4NUgyMjguMzQ1VjM5LjQxODVDMjI4LjM0NSAzOC40OTg3IDIyOC4wOTYgMzcuNzU0NiAyMjcuNjAxIDM3LjE4NTJDMjI3LjAyIDM2LjU0NCAyMjYuMTkgMzYuMjIyOSAyMjUuMTEzIDM2LjIyMjlDMjI0LjAzNSAzNi4yMjI5IDIyMy4yNTUgMzYuNTQ5MyAyMjIuNjI1IDM3LjIwM0MyMjEuOTIzIDM3Ljk0MTggMjIxLjU3MiAzOC45NzA2IDIyMS41NzIgNDAuMjg5NEMyMjEuNTcyIDQxLjM2NyAyMjEuODUxIDQyLjI0NDEgMjIyLjQwOCA0Mi45MjE3QzIyMy4wNzMgNDMuNzMzMiAyMjQuMDYgNDQuMTc0IDIyNS4zNjcgNDQuMjQ2N0MyMjUuNjcgNDQuMjcxNiAyMjYuMTM2IDQ0LjI5NTUgMjI2Ljc2NSA0NC4zMTk1QzIyNi43NTMgNDQuODc2NCAyMjYuNTA4IDQ1LjM1NDUgMjI2LjAzIDQ1Ljc1MzZDMjI1LjU1MiA0Ni4xNTI3IDIyNC45OTIgNDYuMzUzMSAyMjQuMzUgNDYuMzUzMUMyMjMuNzA4IDQ2LjM1MzEgMjIzLjA4NSA0Ni4xODM3IDIyMi40NDQgNDUuODQ0OVY0Ny4yMjVDMjIzLjEwOSA0Ny41NzYyIDIyMy44MTggNDcuNzUxOCAyMjQuNTY4IDQ3Ljc1MThDMjI1LjQ3NiA0Ny43NTE4IDIyNi4yODcgNDcuNDczMyAyMjcuMDAxIDQ2LjkxNjNDMjI3Ljg0OCA0Ni4yMzg3IDIyOC4yOTYgNDUuMzc5MyAyMjguMzQ1IDQ0LjMzODFIMjUzLjQ3MkMyNTQuNDg5IDQ0LjMzODEgMjU1LjI4MiA0NC4wMjMyIDI1NS44NTEgNDMuMzkzNUMyNTYuNDIgNDQuMDIzMiAyNTcuMjEyIDQ0LjMzODEgMjU4LjIzIDQ0LjMzODFIMjU5LjcxOUMyNjAuNjM5IDQ0LjMzODEgMjYxLjM4MyA0NC4wNzIgMjYxLjk1MiA0My41MzlDMjYyLjU2OSA0Mi45NDY1IDI2Mi44NzggNDIuMTM1IDI2Mi44NzggNDEuMTA2MlYzNi40NThMMjYxLjMxNiAzNy4yOTM0VjQxLjA1MjFMMjYxLjMxNyA0MS4wNTEyWk0yMjYuNzY2IDQyLjg2NjdDMjI2LjE3MyA0Mi44NDI4IDIyNS43MzEgNDIuODEyNiAyMjUuNDQxIDQyLjc3NjNDMjIzLjg5MiA0Mi42Nzk2IDIyMy4xMTcgNDEuODM4OCAyMjMuMTE3IDQwLjI1MjFDMjIzLjExNyAzOS40NDE1IDIyMy4yOTMgMzguODA5MSAyMjMuNjQ0IDM4LjM1NTFDMjIzLjk5NSAzNy45MDEgMjI0LjQ4NSAzNy42NzM5IDIyNS4xMTUgMzcuNjczOUMyMjYuMjE2IDM3LjY3MzkgMjI2Ljc2NyAzOC4yOTEyIDIyNi43NjcgMzkuNTI1OEwyMjYuNzY2IDQyLjg2NjdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjYyLjA0MiAzMi40NjI5QzI2MS40NDkgMzIuNDYyOSAyNjEuMTUyIDMyLjc2IDI2MS4xNTIgMzMuMzUyNUMyNjEuMTUyIDMzLjk0NDkgMjYxLjQ0OSAzNC4yNjA2IDI2Mi4wNDIgMzQuMjYwNkMyNjIuNjM1IDM0LjI2MDYgMjYyLjkxNCAzMy45NTgyIDI2Mi45MTQgMzMuMzUyNUMyNjIuOTE0IDMyLjc0NjcgMjYyLjYyMyAzMi40NjI5IDI2Mi4wNDIgMzIuNDYyOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNTkuNzM3IDM0LjI2MDJDMjYwLjMxOCAzNC4yNjAyIDI2MC42MDkgMzMuOTU3NyAyNjAuNjA5IDMzLjM1MkMyNjAuNjA5IDMyLjc0NjIgMjYwLjMxOCAzMi40NjI0IDI1OS43MzcgMzIuNDYyNEMyNTkuMTU2IDMyLjQ2MjQgMjU4Ljg0OCAzMi43NTk1IDI1OC44NDggMzMuMzUyQzI1OC44NDggMzMuOTQ0NCAyNTkuMTQ0IDM0LjI2MDIgMjU5LjczNyAzNC4yNjAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIwMy4wMzMgNTIuOTM5NUgyMDYuMjJWNjIuMjM5NkgyMDcuNzhWNTIuOTM5NUgyMTEuMjE5VjUxLjY1MDlIMjAzLjAzM1Y1Mi45Mzk1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIxNC44NzUgNTQuNDQ0OEMyMTMuOTEzIDU0LjQ0NDggMjEzLjEwMiA1NC44MDIyIDIxMi40NDQgNTUuNTE1M0MyMTEuNzE2IDU2LjMwNzMgMjExLjM1NCA1Ny4yOTQ0IDIxMS4zNTQgNTguNDc1OEMyMTEuMzU0IDU5LjY1NzEgMjExLjY4OSA2MC41NzI0IDIxMi4zNiA2MS4yODY0QzIxMy4wODcgNjIuMDU2MiAyMTQuMDY2IDYyLjQ0MDIgMjE1LjI5NiA2Mi40NDAyQzIxNi4zNjkgNjIuNDQwMiAyMTcuMjk4IDYyLjEyODEgMjE4LjA4IDYxLjUwMzdMMjE3LjY0MyA2MC42ODQyQzIxNi45MjggNjEuMTA4MSAyMTYuMjIzIDYxLjMyMDEgMjE1LjUzIDYxLjMyMDFDMjE0LjgzNiA2MS4zMjAxIDIxNC4yMjcgNjEuMTA1NSAyMTMuNzY5IDYwLjY3NjJDMjEzLjMxIDYwLjI0NjkgMjEzLjA0MSA1OS42NjQyIDIxMi45NjMgNTguOTI4MUgyMTguMzMxVjU4LjQyNjFDMjE4LjMzMSA1Ny4zNTU2IDIxOC4wNzkgNTYuNDY4NyAyMTcuNTc2IDU1Ljc2NjNDMjE2Ljk1IDU0Ljg4NTYgMjE2LjA1IDU0LjQ0NDggMjE0Ljg3NSA1NC40NDQ4Wk0yMTIuOTE0IDU3LjgwNzFDMjEyLjk2OSA1Ny4xMTYyIDIxMy4xNzkgNTYuNTYzNiAyMTMuNTQyIDU2LjE1MTJDMjEzLjkwNiA1NS43Mzg4IDIxNC4zNjcgNTUuNTMyMiAyMTQuOTI2IDU1LjUzMjJDMjE1LjQ4NSA1NS41MzIyIDIxNS45NjkgNTUuNzI5OSAyMTYuMzEgNTYuMTI2NEMyMTYuNjUgNTYuNTIxOSAyMTYuODMyIDU3LjA4MjUgMjE2Ljg1NSA1Ny44MDhIMjEyLjkxNFY1Ny44MDcxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIyNC4xMTggNjEuMzIwMUMyMjMuMzggNjEuMzIwMSAyMjIuNzY0IDYxLjA4MDYgMjIyLjI3MyA2MC42MDA4QzIyMS43MzYgNjAuMDY1MSAyMjEuNDY4IDU5LjM3NDIgMjIxLjQ2OCA1OC41MjYzQzIyMS40NjggNTcuNjc4NSAyMjEuNzA4IDU2Ljk0MzIgMjIyLjE4OSA1Ni4zODU0QzIyMi42NyA1NS44Mjc1IDIyMy4yODUgNTUuNTQ5IDIyNC4wMzQgNTUuNTQ5QzIyNC43MzggNTUuNTQ5IDIyNS4zODYgNTUuNzQ5NSAyMjUuOTc5IDU2LjE1MTJMMjI2LjM4MiA1NS4zNDg2QzIyNS42MzMgNTQuNzQ2NCAyMjQuNzY2IDU0LjQ0NDggMjIzLjc4MyA1NC40NDQ4QzIyMi43OTkgNTQuNDQ0OCAyMjEuODk4IDU0Ljc4NTQgMjIxLjE4MyA1NS40NjU2QzIyMC4zNTYgNTYuMjQ2MSAyMTkuOTQxIDU3LjI1MDEgMjE5Ljk0MSA1OC40NzY3QzIxOS45NDEgNTkuNTY5MyAyMjAuMjYgNjAuNDc4NCAyMjAuODk3IDYxLjIwM0MyMjEuNjM1IDYyLjAyODcgMjIyLjYzIDYyLjQ0MTEgMjIzLjg4MyA2Mi40NDExQzIyNC45NzkgNjIuNDQxMSAyMjUuODUxIDYyLjExODMgMjI2LjQ5OSA2MS40NzA5TDIyNi4wNDYgNjAuNjM0NUMyMjUuNTIgNjEuMDkyMiAyMjQuODc3IDYxLjMyMDEgMjI0LjExNyA2MS4zMjAxSDIyNC4xMThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjMyLjMxOSA1NC40NDUxQzIzMS4zNjggNTQuNDQ1MSAyMzAuNTggNTQuNzkxIDIyOS45NTQgNTUuNDgyOFY1MS40NTA5TDIyOC41MTIgNTIuMjIwOFY2Mi4yNDFIMjI5Ljk1NFY1Ni41MzY0QzIzMC4xMjEgNTYuMzAyMyAyMzAuMzg0IDU2LjEwMTggMjMwLjc0MiA1NS45MzQyQzIzMS4xIDU1Ljc2NjYgMjMxLjQ1MiA1NS42ODMyIDIzMS43OTkgNTUuNjgzMkMyMzMuMDUyIDU1LjY4MzIgMjMzLjY3OCA1Ni4zOTE5IDIzMy42NzggNTcuODA4MlY2Mi4yNDFIMjM1LjEyMVY1Ny43MjQ5QzIzNS4xMjEgNTUuNTM5NSAyMzQuMTg3IDU0LjQ0NiAyMzIuMzIgNTQuNDQ2TDIzMi4zMTkgNTQuNDQ1MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNDYuNTk0IDU5Ljg2NDVMMjQ0LjM0NyA1MS42NTA5SDI0Mi42NjlMMjQwLjQyMiA1OS44NjQ1TDIzOC4yNDEgNTEuNjUwOUgyMzYuNTk4TDIzOS43MDEgNjIuMjM5NkgyNDEuMDZDMjQxLjg1MyA1OS44MzA4IDI0Mi42NyA1Ny4wNDg2IDI0My41MDggNTMuODkyMUMyNDQuMzQ3IDU3LjA0NzcgMjQ1LjE2MyA1OS44MzA4IDI0NS45NTcgNjIuMjM5NkgyNDcuMzE2TDI1MC40MTkgNTEuNjUwOUgyNDguNzc2TDI0Ni41OTUgNTkuODY0NUgyNDYuNTk0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1Mi43NSA1MS40NTEyQzI1Mi41MTUgNTEuNDUxMiAyNTIuMzE0IDUxLjUzNDUgMjUyLjE0NiA1MS43MDIyQzI1MS45NzkgNTEuODY5OCAyNTEuODk1IDUyLjA3MDIgMjUxLjg5NSA1Mi4zMDQ0QzI1MS44OTUgNTIuNTM4NSAyNTEuOTc1IDUyLjc1NTggMjUyLjEzOCA1Mi45MjM0QzI1Mi4zIDUzLjA5MDIgMjUyLjUwNCA1My4xNzQ0IDI1Mi43NSA1My4xNzQ0QzI1Mi45OTUgNTMuMTc0NCAyNTMuMjAzIDUzLjA5MTEgMjUzLjM3IDUyLjkyMzRDMjUzLjUzOCA1Mi43NTU4IDI1My42MjIgNTIuNTUgMjUzLjYyMiA1Mi4zMDQ0QzI1My42MjIgNTIuMDU4NyAyNTMuNTM1IDUxLjg2OTggMjUzLjM2MiA1MS43MDIyQzI1My4xODkgNTEuNTM0NSAyNTIuOTg1IDUxLjQ1MTIgMjUyLjc1IDUxLjQ1MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjUzLjQ1NSA1NC42NDU1SDI1Mi4wMTJWNjIuMjRIMjUzLjQ1NVY1NC42NDU1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1OS45MTIgNTQuNDQ0OEMyNTguODk1IDU0LjQ0NDggMjU4LjEgNTQuNzYyMyAyNTcuNTMgNTUuMzk4MkgyNTcuNDQ1TDI1Ny4zMTEgNTQuNjQ1M0gyNTYuMTA0VjYyLjIzOThIMjU3LjU0NlY1Ni41MzUzQzI1Ny43MTMgNTYuMzAxMSAyNTcuOTc2IDU2LjEwMDcgMjU4LjMzNCA1NS45MzNDMjU4LjY5MSA1NS43NjU0IDI1OS4wNDQgNTUuNjgyMSAyNTkuMzkxIDU1LjY4MjFDMjYwLjY0NCA1NS42ODIxIDI2MS4yNyA1Ni4zOTA3IDI2MS4yNyA1Ny44MDcxVjYyLjIzOThIMjYyLjcxMlY1Ny43MjM3QzI2Mi43MTIgNTUuNTM4NCAyNjEuNzc4IDU0LjQ0NDggMjU5LjkxMSA1NC40NDQ4SDI1OS45MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMzE5IiBoZWlnaHQ9IjEzNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzNzEpIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjUzLjUgMTkzQzI1My41IDE4Ny40NzcgMjU3Ljk3NyAxODMgMjYzLjUgMTgzSDMwOS41QzMxNS4wMjMgMTgzIDMxOS41IDE4Ny40NzcgMzE5LjUgMTkzVjIzOUMzMTkuNSAyNDQuNTIzIDMxNS4wMjMgMjQ5IDMwOS41IDI0OUgyNjMuNUMyNTcuOTc3IDI0OSAyNTMuNSAyNDQuNTIzIDI1My41IDIzOVYxOTNaIiBmaWxsPSIjRjJDMjAwIi8+CjxyZWN0IHg9Ii00OC41IiB5PSIyNTMiIHdpZHRoPSIxNzAiIGhlaWdodD0iNjYiIHJ4PSIxMCIgZmlsbD0iIzdBM0JGMSIvPgo8cGF0aCBkPSJNMTI1LjUgMjYzQzEyNS41IDI1Ny40NzcgMTI5Ljk3NyAyNTMgMTM1LjUgMjUzSDE4MS41QzE4Ny4wMjMgMjUzIDE5MS41IDI1Ny40NzcgMTkxLjUgMjYzVjMwOUMxOTEuNSAzMTQuNTIzIDE4Ny4wMjMgMzE5IDE4MS41IDMxOUgxMzUuNUMxMjkuOTc3IDMxOSAxMjUuNSAzMTQuNTIzIDEyNS41IDMwOVYyNjNaIiBmaWxsPSIjMDNCRkQzIi8+CjxyZWN0IHg9IjE5NS41IiB5PSIyNTMiIHdpZHRoPSIxMjQiIGhlaWdodD0iNjYiIHJ4PSIxMCIgZmlsbD0iI0ZGNDUwMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEyOV8yMzYiPgo8cmVjdCB3aWR0aD0iMzE5IiBoZWlnaHQ9IjUwNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
const SVG_SRC = "data:image/svg+xml;base64," + SVG_B64;
const CW = 319;
const CH = 506;

const PALETTE = [
  "#7A3BF1",
  "#03BFD3",
  "#FF4500",
  "#F2C200",
  "#8B5CF6",
  "#06B6D4",
  "#EF4444",
  "#F97316",
  "#10B981",
  "#A855F7",
];
const ORIG_COLORS = ["#F2C200", "#7A3BF1", "#03BFD3", "#FF4500"];
const RED_CURSOR =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><circle cx='9' cy='9' r='5' fill='%23ef4444'/></svg>\") 9 9";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function recolorSVG(colors) {
  let s = atob(SVG_B64);
  ORIG_COLORS.forEach((orig, i) => {
    s = s.split(orig).join(colors[i]);
  });
  return "data:image/svg+xml;base64," + btoa(s);
}

const CARD_FIELDS = [
  {
    key: "name",
    label: "Name",
    placeholder: "Name",
    x: 16,
    y: 404,
    w: 287,
    h: 22,
    fontSize: 17,
    fontWeight: "800",
    color: "#000",
  },
  {
    key: "position",
    label: "Position",
    placeholder: "Co-op Trainee (Frontend)",
    x: 16,
    y: 437,
    w: 287,
    h: 16,
    fontSize: 11,
    fontWeight: "600",
    color: "#111",
  },
  {
    key: "date",
    label: "Date",
    placeholder: "July 2025 \u2013 Oct 2025",
    x: 16,
    y: 472,
    w: 200,
    h: 13,
    fontSize: 10,
    fontWeight: "400",
    color: "#333",
  },
];

function useTypewriter(value) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  const timer = useRef(null);
  useEffect(() => {
    clearTimeout(timer.current);
    const p = prev.current;
    prev.current = value;
    if (value.startsWith(p) && value.length > p.length) {
      let i = p.length + 1;
      const tick = () => {
        setShown(value.slice(0, i));
        if (i < value.length) {
          i++;
          timer.current = setTimeout(tick, 40);
        }
      };
      tick();
    } else {
      setShown(value);
    }
    return () => clearTimeout(timer.current);
  }, [value]);
  return shown;
}

function CardTextField({ field, value, isActive, onActivate, scale }) {
  const shown = useTypewriter(value);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(id);
  }, [isActive]);
  const txt = value ? shown : field.placeholder;
  const col = value ? field.color : "#aaa";
  const rightX = (CW - field.x - field.w) * scale;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      style={{
        position: "absolute",
        right: rightX,
        top: field.y * scale,
        width: field.w * scale,
        height: field.h * scale,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "text",
        borderBottom:
          scale * 1.2 + "px solid " + (isActive ? "#8B5CF6" : "transparent"),
        transition: "border-color 0.2s",
      }}>
      <span
        style={{
          fontSize: field.fontSize * scale,
          fontWeight: field.fontWeight,
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          color: col,
          whiteSpace: "nowrap",
          overflow: "hidden",
          lineHeight: 1,
          userSelect: "none",
          direction: "ltr",
          textAlign: "left",
        }}>
        {txt}
        {isActive && (
          <span
            style={{
              display: "inline-block",
              width: Math.max(1.5, scale * 1.5),
              height: field.fontSize * scale * 0.85,
              background: "#8B5CF6",
              marginLeft: 2,
              verticalAlign: "middle",
              opacity: blink ? 1 : 0,
            }}
          />
        )}
      </span>
    </div>
  );
}

function PersonalCardGame({ cardScale }) {
  const [values, setValues] = useState({ name: "", position: "", date: "" });
  const [activeKey, setActive] = useState(null);
  const [downloading, setDl] = useState(false);
  const [svgSrc, setSvgSrc] = useState(SVG_SRC);
  const [shaking, setShaking] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!activeKey) return;

    // Focus hidden input for mobile keyboard
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const keys = CARD_FIELDS.map((f) => f.key);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setActive(keys[(keys.indexOf(activeKey) + 1) % keys.length]);
        return;
      }
      if (e.key === "Enter") {
        setActive(null);
        return;
      }
      // Backspace and character input are now handled by the hidden input's onChange
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeKey]);

  const handleRecolor = () => {
    setSvgSrc(recolorSVG(shuffle(PALETTE).slice(0, 4)));
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };
  const handleReset = () => {
    setSvgSrc(SVG_SRC);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const hasData = Object.values(values).some((val) => val.trim().length > 0);
  const isDownloadDisabled = downloading || !hasData;

  const downloadJPG = async () => {
    setDl(true);
    try {
      const DPR = 3;
      const canvas = document.createElement("canvas");
      canvas.width = CW * DPR;
      canvas.height = CH * DPR;
      const ctx = canvas.getContext("2d");
      ctx.scale(DPR, DPR);
      await new Promise((res) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, CW, CH);
          res();
        };
        img.src = svgSrc;
      });
      CARD_FIELDS.forEach((f) => {
        const val = values[f.key];
        if (!val) return;
        ctx.font =
          f.fontWeight +
          " " +
          f.fontSize +
          "px Helvetica Neue, Arial, sans-serif";
        ctx.fillStyle = f.color;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(val, f.x, f.y + f.h / 2);
      });
      const a = document.createElement("a");
      a.download = "techwin-card.jpg";
      a.href = canvas.toDataURL("image/jpeg", 0.95);
      a.click();
    } finally {
      setDl(false);
    }
  };

  const s = cardScale;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        justifyContent: "center",
        direction: "ltr",
      }}>
      {/* Hidden input to trigger mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
        }}
        value={activeKey ? values[activeKey] : ""}
        onChange={(e) => {
          if (activeKey) {
            setValues((v) => ({ ...v, [activeKey]: e.target.value }));
          }
        }}
      />
      <div
        style={{
          width: isMobile ? "100%" : "auto",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          flexWrap: "wrap",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: "0.6rem",
          minWidth: isMobile ? "auto" : "9.5rem",
          order: isMobile ? 2 : 1,
        }}>
        <button
          onClick={handleRecolor}
          style={{
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
            borderRadius: "9999px",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(0.7rem, 2vw, 0.82rem)",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            width: isMobile ? "auto" : "9.5rem",
            flexGrow: isMobile ? 1 : 0,
            boxShadow:
              "-3px -3px 10px 0px #8B5CF622, 3px 3px 10px 0px #06B6D422",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.16)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              width: "100%",
            }}>
            <Shuffle size={14} />
            {"تغيير الشكل"}
          </span>
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
            borderRadius: "9999px",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(0.7rem, 2vw, 0.82rem)",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            width: isMobile ? "auto" : "9.5rem",
            flexGrow: isMobile ? 1 : 0,
            boxShadow:
              "-3px -3px 10px 0px #EAB30822, 3px 3px 10px 0px #EF444422",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.16)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              width: "100%",
            }}>
            <RotateCcw size={14} />
            {"إرجاع"}
          </span>
        </button>
        <button
          onClick={downloadJPG}
          disabled={isDownloadDisabled}
          style={{
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
            borderRadius: "9999px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: isDownloadDisabled
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: isDownloadDisabled
              ? "rgba(255,255,255,0.35)"
              : "rgba(255,255,255,0.85)",
            fontSize: "clamp(0.7rem, 2vw, 0.82rem)",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: isDownloadDisabled ? "not-allowed" : "pointer",
            width: isMobile ? "100%" : "9.5rem",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), -4px -4px 12px 0px #8B5CF622, 4px 4px 12px 0px #06B6D422, 0 6px 24px rgba(0,0,0,0.25)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!isDownloadDisabled) {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDownloadDisabled
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              width: "100%",
            }}>
            <Download size={14} />
            {downloading ? "..." : "تحميل"}
          </span>
        </button>
      </div>
      <div
        style={{
          position: "relative",
          width: CW * s,
          height: CH * s,
          borderRadius: 14 * s,
          overflow: "hidden",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
          flexShrink: 0,
          animation: shaking ? "cardShake 0.45s ease" : "none",
          order: isMobile ? 1 : 2,
        }}>
        <img
          src={svgSrc}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {CARD_FIELDS.map((f) => (
          <CardTextField
            key={f.key}
            field={f}
            value={values[f.key]}
            isActive={activeKey === f.key}
            onActivate={() => setActive(f.key)}
            scale={s}
          />
        ))}
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  {
    key: "greeting",
    label:
      "\u0628\u0637\u0627\u0626\u0642 \u0627\u0644\u062a\u0647\u0646\u0626\u0629",
    color: "#06B6D4",
  },
  {
    key: "personal",
    label:
      "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
    color: "#F97316",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useState("idle");
  const [selected, setSelected] = useState(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 800,
  );
  const cardRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isIdle = step === "idle";
  const isExpanded = step === "expanded";
  const isSelected = step === "selected";

  const goTo = useCallback(
    (nextStep, nextSelected = selected) => {
      setContentVisible(false);
      setTimeout(() => {
        setStep(nextStep);
        setSelected(nextSelected);
        setTimeout(() => setContentVisible(true), 40);
      }, 220);
    },
    [selected],
  );

  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  useEffect(() => {
    if (isIdle) return;
    const onOut = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        goTo("idle", null);
      }
    };
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, [goTo, isExpanded, isIdle, isSelected]);

  const cardScale = Math.min(1.1, (Math.min(vw * 0.88, 720) - 60) / CW);

  return (
    <div className="flex items-center justify-center min-h-[85vh] py-4 sm:py-6 px-4">
      <div
        ref={cardRef}
        onMouseEnter={() => isIdle && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => isIdle && goTo("expanded")}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1.2,
          userSelect: "none",
          gap: "0.5em",
          width: isSelected
            ? Math.min(vw * 0.95, 720) + "px"
            : "min(820px, 94vw)",
          minWidth: isExpanded ? "min(620px, 92vw)" : "auto",
          minHeight: isSelected ? "auto" : "min(420px, 60vh)",
          padding: vw < 640 ? "1.2em 1.5em" : "1.6em 2.2em",
          borderRadius: vw < 640 ? "1.5rem" : "2.5rem",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: isIdle ? `${RED_CURSOR}, pointer` : `${RED_CURSOR}, auto`,
          boxShadow:
            "-6px -6px 20px 0px #F9731633, 6px 6px 20px 0px #EF444433, 0 8px 40px 0px rgba(0,0,0,0.35)",
          transform: hovered && isIdle ? "scale(1.02)" : "scale(1)",
          transition:
            "transform 0.3s ease, width 0.6s cubic-bezier(0.4,0,0.2,1), min-width 0.6s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "linear-gradient(105deg,#EF444411 0%,#F9731622 25%,rgba(255,255,255,0.06) 50%,#06B6D422 75%,#8B5CF611 100%)",
            backgroundSize: "250% 100%",
            animation: "shimmer 5s ease-in-out infinite alternate",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.3rem",
            fontWeight: 700,
            opacity: hovered && isIdle ? 1 : 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
            zIndex: 5,
          }}>
          {"\u0627\u0646\u0642\u0631 \u0644\u0644\u0628\u062f\u0621 \u2756"}
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: isIdle ? "center" : "flex-start",
            gap: "0.5em",
            width: "100%",
            minHeight: isIdle ? "min(360px, 60vh)" : "auto",
            opacity: !isSelected && contentVisible ? 1 : 0,
            transform:
              !isSelected && contentVisible
                ? "translateY(0)"
                : "translateY(10px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            pointerEvents: isSelected ? "none" : "auto",
            maxHeight: isSelected ? 0 : "9999px",
            overflow: "visible",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              gap: "0.2em",
            }}>
            <span
              style={{
                color: "var(--color-orange)",
                fontSize: "clamp(3.5rem,9vw,7rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                opacity: hovered && isIdle ? 0.3 : 1,
                transition: "opacity 0.25s ease",
              }}>
              {
                "\u0628\u0640\u0640\u0640\u0640\u0640\u0637\u0627\u0642\u0640\u0640\u0640\u0640\u0627\u062a"
              }
            </span>
            <span
              style={{
                color: "var(--color-red)",
                fontSize: "clamp(3.5rem,9vw,7rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                opacity: hovered && isIdle ? 0.3 : 1,
                transition: "opacity 0.25s ease",
              }}>
              {
                "\u062a\u0643\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0648\u064a\u0640\u0640\u0640\u0646"
              }
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6em",
              width: "100%",
              maxHeight: isExpanded ? "400px" : "0px",
              opacity: isExpanded ? 1 : 0,
              overflow: "hidden",
              transition:
                "max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
              marginTop: isExpanded ? "0.6em" : "0",
            }}>
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.15)",
                marginBottom: "0.2em",
              }}
            />
            {NAV_ITEMS.map((item) => {
              const isDisabled = item.key === "personal";
              return (
                <button
                  key={item.key}
                  disabled={isDisabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDisabled) goTo("selected", item);
                  }}
                  style={{
                    background: isDisabled
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.06)",
                    border:
                      "1px solid " +
                      (isDisabled ? "rgba(255,255,255,0.1)" : item.color + "44"),
                    borderRadius: "1rem",
                    padding: "0.7em 1.2em",
                    color: isDisabled ? "rgba(255,255,255,0.25)" : item.color,
                    fontSize: "clamp(1rem,2.5vw,1.3rem)",
                    fontWeight: 700,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    textAlign: "right",
                    fontFamily: "inherit",
                    opacity: isDisabled ? 0.45 : 1,
                    transition:
                      "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (isDisabled) return;
                    e.currentTarget.style.background = item.color + "22";
                    e.currentTarget.style.transform = "translateX(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 16px 2px " + item.color + "33";
                  }}
                  onMouseLeave={(e) => {
                    if (isDisabled) return;
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
            opacity: isSelected && contentVisible ? 1 : 0,
            transform:
              isSelected && contentVisible
                ? "translateY(0)"
                : "translateY(16px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: isSelected ? "auto" : "none",
          }}>
          {selected && selected.key === "personal" && (
            <PersonalCardGame cardScale={cardScale} />
          )}
          {selected && selected.key === "greeting" && <GreetingCards />}
        </div>
        <style>{`
          @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
          @keyframes cardShake {
            0%  { transform: translateX(0) rotate(0deg); }
            15% { transform: translateX(-6px) rotate(-1.5deg); }
            30% { transform: translateX(6px) rotate(1.5deg); }
            45% { transform: translateX(-5px) rotate(-1deg); }
            60% { transform: translateX(5px) rotate(1deg); }
            75% { transform: translateX(-3px) rotate(-0.5deg); }
            90% { transform: translateX(3px) rotate(0.5deg); }
            100%{ transform: translateX(0) rotate(0deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
