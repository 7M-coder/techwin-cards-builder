import React, { useState, useRef, useEffect } from "react";

const SVG_B64 =
  "PHN2ZyB3aWR0aD0iMzE5IiBoZWlnaHQ9IjUwNiIgdmlld0JveD0iMCAwIDMxOSA1MDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMjlfMjM2KSI+CjxyZWN0IHdpZHRoPSIzMTkiIGhlaWdodD0iNTA2IiBmaWxsPSIjMEQwRDBEIi8+CjxwYXRoIGQ9Ik0yODkuNDIgMzJIMjcyLjYxM0MyNzAuODU1IDMyIDI2OS40MyAzMy40MjUxIDI2OS40MyAzNS4xODMxVjM4LjQyNTZDMjY5LjQzIDQwLjE4MzYgMjcwLjg1NSA0MS42MDg3IDI3Mi42MTMgNDEuNjA4N0gyODkuNDJDMjkxLjE3OCA0MS42MDg3IDI5Mi42MDMgNDAuMTgzNiAyOTIuNjAzIDM4LjQyNTZWMzUuMTgzMUMyOTIuNjAzIDMzLjQyNTEgMjkxLjE3OCAzMiAyODkuNDIgMzJaIiBmaWxsPSIjN0EzQkYxIi8+CjxwYXRoIGQ9Ik0yOTkuODE2IDMyLjAzMDNIMjk2LjYzNEMyOTQuODc2IDMyLjAzMDMgMjkzLjQ1MSAzMy40NTU0IDI5My40NTEgMzUuMjEzNFYzOC4zOTU2QzI5My40NTEgNDAuMTUzNSAyOTQuODc2IDQxLjU3ODcgMjk2LjYzNCA0MS41Nzg3SDI5OS44MTZDMzAxLjU3NCA0MS41Nzg3IDMwMyA0MC4xNTM1IDMwMyAzOC4zOTU2VjM1LjIxMzRDMzAzIDMzLjQ1NTQgMzAxLjU3NCAzMi4wMzAzIDI5OS44MTYgMzIuMDMwM1oiIGZpbGw9IiMwM0JGRDMiLz4KPHBhdGggZD0iTTI3OC45NzggNDIuNDU1NkgyNzIuNjEzQzI3MC44NTUgNDIuNDU1NiAyNjkuNDMgNDMuODgwNyAyNjkuNDMgNDUuNjM4N1Y0OC44MjA5QzI2OS40MyA1MC41Nzg4IDI3MC44NTUgNTIuMDA0IDI3Mi42MTMgNTIuMDA0SDI3OC45NzhDMjgwLjczNiA1Mi4wMDQgMjgyLjE2MSA1MC41Nzg4IDI4Mi4xNjEgNDguODIwOVY0NS42Mzg3QzI4Mi4xNjEgNDMuODgwNyAyODAuNzM2IDQyLjQ1NTYgMjc4Ljk3OCA0Mi40NTU2WiIgZmlsbD0iI0ZGNDUwMCIvPgo8cGF0aCBkPSJNMjg5LjM3NSA0Mi40NTU4SDI4Ni4xOTNDMjg0LjQzNSA0Mi40NTU4IDI4My4wMSA0My44ODA5IDI4My4wMSA0NS42Mzg5VjQ4LjgyMTFDMjgzLjAxIDUwLjU3OTEgMjg0LjQzNSA1Mi4wMDQyIDI4Ni4xOTMgNTIuMDA0MkgyODkuMzc1QzI5MS4xMzMgNTIuMDA0MiAyOTIuNTU4IDUwLjU3OTEgMjkyLjU1OCA0OC44MjExVjQ1LjYzODlDMjkyLjU1OCA0My44ODA5IDI5MS4xMzMgNDIuNDU1OCAyODkuMzc1IDQyLjQ1NThaIiBmaWxsPSIjRjJDMjAwIi8+CjxwYXRoIGQ9Ik0yOTguMTggNDIuNDU1NkMzMDAuODE3IDQyLjQ1NTYgMzAyLjk1NSA0NC41OTMgMzAyLjk1NSA0Ny4yMjk4QzMwMi45NTUgNDkuODY2NSAzMDAuODE3IDUyLjAwNCAyOTguMTggNTIuMDA0QzI5NS41NDQgNTIuMDA0IDI5My40MDYgNDkuODY2NSAyOTMuNDA2IDQ3LjIyOThDMjkzLjQwNiA0NC41OTMgMjk1LjU0NCA0Mi40NTU2IDI5OC4xOCA0Mi40NTU2WiIgZmlsbD0iI0YyQzIwMCIvPgo8cGF0aCBkPSJNMjk5LjY2NyA1Mi44NTNIMjcyLjYxM0MyNzAuODU1IDUyLjg1MyAyNjkuNDMgNTQuMjc4MSAyNjkuNDMgNTYuMDM2MVY1OS4yMTgzQzI2OS40MyA2MC45NzYzIDI3MC44NTUgNjIuNDAxNCAyNzIuNjEzIDYyLjQwMTRIMjk5LjY2N0MzMDEuNDI1IDYyLjQwMTQgMzAyLjg1IDYwLjk3NjMgMzAyLjg1IDU5LjIxODNWNTYuMDM2MUMzMDIuODUgNTQuMjc4MSAzMDEuNDI1IDUyLjg1MyAyOTkuNjY3IDUyLjg1M1oiIGZpbGw9IiNGRjQ1MDAiLz4KPHBhdGggZD0iTTIwNy41NzcgMzYuMTQ4M0MyMDguMTU4IDM2LjE0ODMgMjA4LjQ0OSAzNS44NDU5IDIwOC40NDkgMzUuMjQwMUMyMDguNDQ5IDM0LjYzNDQgMjA4LjE1OCAzNC4zNTA2IDIwNy41NzcgMzQuMzUwNkMyMDYuOTk2IDM0LjM1MDYgMjA2LjY4OCAzNC42NDc3IDIwNi42ODggMzUuMjQwMUMyMDYuNjg4IDM1LjgzMjYgMjA2Ljk4NCAzNi4xNDgzIDIwNy41NzcgMzYuMTQ4M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTcuNTc5IDQ2LjE1MjZDMjE2Ljk4NiA0Ni4xNTI2IDIxNi42ODkgNDYuNDQ4OCAyMTYuNjg5IDQ3LjA0MjJDMjE2LjY4OSA0Ny42MzU1IDIxNi45ODYgNDcuOTUwMyAyMTcuNTc5IDQ3Ljk1MDNDMjE4LjE3MiA0Ny45NTAzIDIxOC40NTEgNDcuNjQ3OSAyMTguNDUxIDQ3LjA0MjJDMjE4LjQ1MSA0Ni40MzY0IDIxOC4xNiA0Ni4xNTI2IDIxNy41NzkgNDYuMTUyNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTcuMjg5IDQxLjA1MTFDMjE3LjI4OSA0Mi4yNjE3IDIxNi42OTYgNDIuODY2NiAyMTUuNTEgNDIuODY2NkgyMTQuMjAyQzIxMy4wMTYgNDIuODY2NiAyMTIuNDIzIDQyLjI2MTcgMjEyLjQyMyA0MS4wNTExVjM2LjQ1NzhMMjEwLjg2MSAzNy4yOTMzVjQzLjM1N0MyMTAuODYxIDQ0LjE5MjUgMjEwLjYxOSA0NC44NzAxIDIxMC4xMzUgNDUuMzkwN0MyMDkuNTU0IDQ2LjAwOCAyMDguNzMxIDQ2LjMxNjYgMjA3LjY2NiA0Ni4zMTY2QzIwNi43NDYgNDYuMzE2NiAyMDUuOTkgNDYuMDE0MiAyMDUuMzk2IDQ1LjQwODRDMjA0Ljc2NyA0NC43NTQ4IDIwNC40NTIgNDMuOTE5MyAyMDQuNDUyIDQyLjkwMjlDMjA0LjQ1MiA0MS44ODY2IDIwNC43MjQgNDAuOTg0NiAyMDUuMjY5IDQwLjEyNTJMMjAzLjc2MiA0MC40NTE1QzIwMy4yNTUgNDEuMTc3OSAyMDMgNDIuMDQ5NyAyMDMgNDMuMDY2MUMyMDMgNDQuMjQwNCAyMDMuMzMzIDQ1LjI1NjggMjAzLjk5OSA0Ni4xMTYyQzIwNC44NyA0Ny4yMjkzIDIwNi4wOTMgNDcuNzg2MiAyMDcuNjY2IDQ3Ljc4NjJDMjA4LjkwMSA0Ny43ODYyIDIwOS45MzYgNDcuNDcxNCAyMTAuNzcxIDQ2Ljg0MTdDMjExLjcwMyA0Ni4xNTE3IDIxMi4yNDIgNDUuMTg5NCAyMTIuMzg3IDQzLjk1NDhDMjEyLjg0NiA0NC4yMDk0IDIxMy4zOTIgNDQuMzM2MiAyMTQuMDIxIDQ0LjMzNjJIMjE1LjY5MUMyMTYuNjEgNDQuMzM2MiAyMTcuMzU1IDQ0LjA3MDEgMjE3LjkyNCA0My41MzcxQzIxOC41NDEgNDIuOTQ0NiAyMTguODUgNDIuMTMzMSAyMTguODUgNDEuMTA0M1YzNi40NTYxTDIxNy4yODggMzcuMjkxNVY0MS4wNTAyTDIxNy4yODkgNDEuMDUxMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMTYuMTQ0IDQ3LjA0MjJDMjE2LjE0NCA0Ni40NDg4IDIxNS44NTMgNDYuMTUyNiAyMTUuMjcyIDQ2LjE1MjZDMjE0LjY5MSA0Ni4xNTI2IDIxNC4zODMgNDYuNDQ4OCAyMTQuMzgzIDQ3LjA0MjJDMjE0LjM4MyA0Ny42MzU1IDIxNC42OCA0Ny45NTAzIDIxNS4yNzIgNDcuOTUwM0MyMTUuODY1IDQ3Ljk1MDMgMjE2LjE0NCA0Ny42NDc5IDIxNi4xNDQgNDcuMDQyMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNjEuMzE3IDQxLjA1MTJDMjYxLjMxNyA0Mi4yNjE5IDI2MC43MjQgNDIuODY2NyAyNTkuNTM4IDQyLjg2NjdIMjU4LjM5NEMyNTcuMjIgNDIuODY2NyAyNTYuNjMyIDQyLjI2MTkgMjU2LjYzMiA0MS4wNTEyVjQwLjg1MTdDMjU2LjYzMiAzOS42NjU5IDI1Ni4yNTEgMzguNjg1IDI1NS40ODggMzcuOTEwN0MyNTQuNjQxIDM3LjA3NTMgMjUzLjUyNyAzNi42NTg0IDI1Mi4xNDcgMzYuNjU4NEgyNTIuMDM4TDI1NS42MTUgMzIuNjI3NEgyNTQuMDE4TDI1MC4wNDIgMzcuMDM5OFYzOC41ODNDMjUwLjY4MyAzOC4zNDA5IDI1MS4zMjQgMzguMjIwMiAyNTEuOTY2IDM4LjIyMDJDMjUyLjc3NyAzOC4yMjAyIDI1My40NjEgMzguNDEzNiAyNTQuMDE4IDM4LjgwMTJDMjU0LjcxOSAzOS4yNzMgMjU1LjA3MSAzOS45NjMgMjU1LjA3MSA0MC44NzEyVjQxLjAzNDRDMjU1LjA3MSA0Mi4yNTc0IDI1NC40OSA0Mi44Njg1IDI1My4zMjggNDIuODY4NUgyMjguMzQ1VjM5LjQxODVDMjI4LjM0NSAzOC40OTg3IDIyOC4wOTYgMzcuNzU0NiAyMjcuNjAxIDM3LjE4NTJDMjI3LjAyIDM2LjU0NCAyMjYuMTkgMzYuMjIyOSAyMjUuMTEzIDM2LjIyMjlDMjI0LjAzNSAzNi4yMjI5IDIyMy4yNTUgMzYuNTQ5MyAyMjIuNjI1IDM3LjIwM0MyMjEuOTIzIDM3Ljk0MTggMjIxLjU3MiAzOC45NzA2IDIyMS41NzIgNDAuMjg5NEMyMjEuNTcyIDQxLjM2NyAyMjEuODUxIDQyLjI0NDEgMjIyLjQwOCA0Mi45MjE3QzIyMy4wNzMgNDMuNzMzMiAyMjQuMDYgNDQuMTc0IDIyNS4zNjcgNDQuMjQ2N0MyMjUuNjcgNDQuMjcxNiAyMjYuMTM2IDQ0LjI5NTUgMjI2Ljc2NSA0NC4zMTk1QzIyNi43NTMgNDQuODc2NCAyMjYuNTA4IDQ1LjM1NDUgMjI2LjAzIDQ1Ljc1MzZDMjI1LjU1MiA0Ni4xNTI3IDIyNC45OTIgNDYuMzUzMSAyMjQuMzUgNDYuMzUzMUMyMjMuNzA4IDQ2LjM1MzEgMjIzLjA4NSA0Ni4xODM3IDIyMi40NDQgNDUuODQ0OVY0Ny4yMjVDMjIzLjEwOSA0Ny41NzYyIDIyMy44MTggNDcuNzUxOCAyMjQuNTY4IDQ3Ljc1MThDMjI1LjQ3NiA0Ny43NTE4IDIyNi4yODcgNDcuNDczMyAyMjcuMDAxIDQ2LjkxNjNDMjI3Ljg0OCA0Ni4yMzg3IDIyOC4yOTYgNDUuMzc5MyAyMjguMzQ1IDQ0LjMzODFIMjUzLjQ3MkMyNTQuNDg5IDQ0LjMzODEgMjU1LjI4MiA0NC4wMjMyIDI1NS44NTEgNDMuMzkzNUMyNTYuNDIgNDQuMDIzMiAyNTcuMjEyIDQ0LjMzODEgMjU4LjIzIDQ0LjMzODFIMjU5LjcxOUMyNjAuNjM5IDQ0LjMzODEgMjYxLjM4MyA0NC4wNzIgMjYxLjk1MiA0My41MzlDMjYyLjU2OSA0Mi45NDY1IDI2Mi44NzggNDIuMTM1IDI2Mi44NzggNDEuMTA2MlYzNi40NThMMjYxLjMxNiAzNy4yOTM0VjQxLjA1MjFMMjYxLjMxNyA0MS4wNTEyWk0yMjYuNzY2IDQyLjg2NjdDMjI2LjE3MyA0Mi44NDI4IDIyNS43MzEgNDIuODEyNiAyMjUuNDQxIDQyLjc3NjNDMjIzLjg5MiA0Mi42Nzk2IDIyMy4xMTcgNDEuODM4OCAyMjMuMTE3IDQwLjI1MjFDMjIzLjExNyAzOS40NDE1IDIyMy4yOTMgMzguODA5MSAyMjMuNjQ0IDM4LjM1NTFDMjIzLjk5NSAzNy45MDEgMjI0LjQ4NSAzNy42NzM5IDIyNS4xMTUgMzcuNjczOUMyMjYuMjE2IDM3LjY3MzkgMjI2Ljc2NyAzOC4yOTEyIDIyNi43NjcgMzkuNTI1OEwyMjYuNzY2IDQyLjg2NjdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjYyLjA0MiAzMi40NjI5QzI2MS40NDkgMzIuNDYyOSAyNjEuMTUyIDMyLjc2IDI2MS4xNTIgMzMuMzUyNUMyNjEuMTUyIDMzLjk0NDkgMjYxLjQ0OSAzNC4yNjA2IDI2Mi4wNDIgMzQuMjYwNkMyNjIuNjM1IDM0LjI2MDYgMjYyLjkxNCAzMy45NTgyIDI2Mi45MTQgMzMuMzUyNUMyNjIuOTE0IDMyLjc0NjcgMjYyLjYyMyAzMi40NjI5IDI2Mi4wNDIgMzIuNDYyOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNTkuNzM3IDM0LjI2MDJDMjYwLjMxOCAzNC4yNjAyIDI2MC42MDkgMzMuOTU3NyAyNjAuNjA5IDMzLjM1MkMyNjAuNjA5IDMyLjc0NjIgMjYwLjMxOCAzMi40NjI0IDI1OS43MzcgMzIuNDYyNEMyNTkuMTU2IDMyLjQ2MjQgMjU4Ljg0OCAzMi43NTk1IDI1OC44NDggMzMuMzUyQzI1OC44NDggMzMuOTQ0NCAyNTkuMTQ0IDM0LjI2MDIgMjU5LjczNyAzNC4yNjAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIwMy4wMzMgNTIuOTM5NUgyMDYuMjJWNjIuMjM5NkgyMDcuNzhWNTIuOTM5NUgyMTEuMjE5VjUxLjY1MDlIMjAzLjAzM1Y1Mi45Mzk1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIxNC44NzUgNTQuNDQ0OEMyMTMuOTEzIDU0LjQ0NDggMjEzLjEwMiA1NC44MDIyIDIxMi40NDQgNTUuNTE1M0MyMTEuNzE2IDU2LjMwNzMgMjExLjM1NCA1Ny4yOTQ0IDIxMS4zNTQgNTguNDc1OEMyMTEuMzU0IDU5LjY1NzEgMjExLjY4OSA2MC41NzI0IDIxMi4zNiA2MS4yODY0QzIxMy4wODcgNjIuMDU2MiAyMTQuMDY2IDYyLjQ0MDIgMjE1LjI5NiA2Mi40NDAyQzIxNi4zNjkgNjIuNDQwMiAyMTcuMjk4IDYyLjEyODEgMjE4LjA4IDYxLjUwMzdMMjE3LjY0MyA2MC42ODQyQzIxNi45MjggNjEuMTA4MSAyMTYuMjIzIDYxLjMyMDEgMjE1LjUzIDYxLjMyMDFDMjE0LjgzNiA2MS4zMjAxIDIxNC4yMjcgNjEuMTA1NSAyMTMuNzY5IDYwLjY3NjJDMjEzLjMxIDYwLjI0NjkgMjEzLjA0MSA1OS42NjQyIDIxMi45NjMgNTguOTI4MUgyMTguMzMxVjU4LjQyNjFDMjE4LjMzMSA1Ny4zNTU2IDIxOC4wNzkgNTYuNDY4NyAyMTcuNTc2IDU1Ljc2NjNDMjE2Ljk1IDU0Ljg4NTYgMjE2LjA1IDU0LjQ0NDggMjE0Ljg3NSA1NC40NDQ4Wk0yMTIuOTE0IDU3LjgwNzFDMjEyLjk2OSA1Ny4xMTYyIDIxMy4xNzkgNTYuNTYzNiAyMTMuNTQyIDU2LjE1MTJDMjEzLjkwNiA1NS43Mzg4IDIxNC4zNjcgNTUuNTMyMiAyMTQuOTI2IDU1LjUzMjJDMjE1LjQ4NSA1NS41MzIyIDIxNS45NjkgNTUuNzI5OSAyMTYuMzEgNTYuMTI2NEMyMTYuNjUgNTYuNTIxOSAyMTYuODMyIDU3LjA4MjUgMjE2Ljg1NSA1Ny44MDhIMjEyLjkxNFY1Ny44MDcxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIyNC4xMTggNjEuMzIwMUMyMjMuMzggNjEuMzIwMSAyMjIuNzY0IDYxLjA4MDYgMjIyLjI3MyA2MC42MDA4QzIyMS43MzYgNjAuMDY1MSAyMjEuNDY4IDU5LjM3NDIgMjIxLjQ2OCA1OC41MjYzQzIyMS40NjggNTcuNjc4NSAyMjEuNzA4IDU2Ljk0MzIgMjIyLjE4OSA1Ni4zODU0QzIyMi42NyA1NS44Mjc1IDIyMy4yODUgNTUuNTQ5IDIyNC4wMzQgNTUuNTQ5QzIyNC43MzggNTUuNTQ5IDIyNS4zODYgNTUuNzQ5NSAyMjUuOTc5IDU2LjE1MTJMMjI2LjM4MiA1NS4zNDg2QzIyNS42MzMgNTQuNzQ2NCAyMjQuNzY2IDU0LjQ0NDggMjIzLjc4MyA1NC40NDQ4QzIyMi43OTkgNTQuNDQ0OCAyMjEuODk4IDU0Ljc4NTQgMjIxLjE4MyA1NS40NjU2QzIyMC4zNTYgNTYuMjQ2MSAyMTkuOTQxIDU3LjI1MDEgMjE5Ljk0MSA1OC40NzY3QzIxOS45NDEgNTkuNTY5MyAyMjAuMjYgNjAuNDc4NCAyMjAuODk3IDYxLjIwM0MyMjEuNjM1IDYyLjAyODcgMjIyLjYzIDYyLjQ0MTEgMjIzLjg4MyA2Mi40NDExQzIyNC45NzkgNjIuNDQxMSAyMjUuODUxIDYyLjExODMgMjI2LjQ5OSA2MS40NzA5TDIyNi4wNDYgNjAuNjM0NUMyMjUuNTIgNjEuMDkyMiAyMjQuODc3IDYxLjMyMDEgMjI0LjExNyA2MS4zMjAxSDIyNC4xMThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjMyLjMxOSA1NC40NDUxQzIzMS4zNjggNTQuNDQ1MSAyMzAuNTggNTQuNzkxIDIyOS45NTQgNTUuNDgyOFY1MS40NTA5TDIyOC41MTIgNTIuMjIwOFY2Mi4yNDFIMjI5Ljk1NFY1Ni41MzY0QzIzMC4xMjEgNTYuMzAyMyAyMzAuMzg0IDU2LjEwMTggMjMwLjc0MiA1NS45MzQyQzIzMS4xIDU1Ljc2NjYgMjMxLjQ1MiA1NS42ODMyIDIzMS43OTkgNTUuNjgzMkMyMzMuMDUyIDU1LjY4MzIgMjMzLjY3OCA1Ni4zOTE5IDIzMy42NzggNTcuODA4MlY2Mi4yNDFIMjM1LjEyMVY1Ny43MjQ5QzIzNS4xMjEgNTUuNTM5NSAyMzQuMTg3IDU0LjQ0NiAyMzIuMzIgNTQuNDQ2TDIzMi4zMTkgNTQuNDQ1MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNDYuNTk0IDU5Ljg2NDVMMjQ0LjM0NyA1MS42NTA5SDI0Mi42NjlMMjQwLjQyMiA1OS44NjQ1TDIzOC4yNDEgNTEuNjUwOUgyMzYuNTk4TDIzOS43MDEgNjIuMjM5NkgyNDEuMDZDMjQxLjg1MyA1OS44MzA4IDI0Mi42NyA1Ny4wNDg2IDI0My41MDggNTMuODkyMUMyNDQuMzQ3IDU3LjA0NzcgMjQ1LjE2MyA1OS44MzA4IDI0NS45NTcgNjIuMjM5NkgyNDcuMzE2TDI1MC40MTkgNTEuNjUwOUgyNDguNzc2TDI0Ni41OTUgNTkuODY0NUgyNDYuNTk0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1Mi43NSA1MS40NTEyQzI1Mi41MTUgNTEuNDUxMiAyNTIuMzE0IDUxLjUzNDUgMjUyLjE0NiA1MS43MDIyQzI1MS45NzkgNTEuODY5OCAyNTEuODk1IDUyLjA3MDIgMjUxLjg5NSA1Mi4zMDQ0QzI1MS44OTUgNTIuNTM4NSAyNTEuOTc1IDUyLjc1NTggMjUyLjEzOCA1Mi45MjM0QzI1Mi4zIDUzLjA5MDIgMjUyLjUwNCA1My4xNzQ0IDI1Mi43NSA1My4xNzQ0QzI1Mi45OTUgNTMuMTc0NCAyNTMuMjAzIDUzLjA5MTEgMjUzLjM3IDUyLjkyMzRDMjUzLjUzOCA1Mi43NTU4IDI1My42MjIgNTIuNTUgMjUzLjYyMiA1Mi4zMDQ0QzI1My42MjIgNTIuMDU4NyAyNTMuNTM1IDUxLjg2OTggMjUzLjM2MiA1MS43MDIyQzI1My4xODkgNTEuNTM0NSAyNTIuOTg1IDUxLjQ1MTIgMjUyLjc1IDUxLjQ1MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjUzLjQ1NSA1NC42NDU1SDI1Mi4wMTJWNjIuMjRIMjUzLjQ1NVY1NC42NDU1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1OS45MTIgNTQuNDQ0OEMyNTguODk1IDU0LjQ0NDggMjU4LjEgNTQuNzYyMyAyNTcuNTMgNTUuMzk4MkgyNTcuNDQ1TDI1Ny4zMTEgNTQuNjQ1M0gyNTYuMTA0VjYyLjIzOThIMjU3LjU0NlY1Ni41MzUzQzI1Ny43MTMgNTYuMzAxMSAyNTcuOTc2IDU2LjEwMDcgMjU4LjMzNCA1NS45MzNDMjU4LjY5MSA1NS43NjU0IDI1OS4wNDQgNTUuNjgyMSAyNTkuMzkxIDU1LjY4MjFDMjYwLjY0NCA1NS42ODIxIDI2MS4yNyA1Ni4zOTA3IDI2MS4yNyA1Ny44MDcxVjYyLjIzOThIMjYyLjcxMlY1Ny43MjM3QzI2Mi43MTIgNTUuNTM4NCAyNjEuNzc4IDU0LjQ0NDggMjU5LjkxMSA1NC40NDQ4SDI1OS45MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMzE5IiBoZWlnaHQ9IjEzNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzNzEpIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjUzLjUgMTkzQzI1My41IDE4Ny40NzcgMjU3Ljk3NyAxODMgMjYzLjUgMTgzSDMwOS41QzMxNS4wMjMgMTgzIDMxOS41IDE4Ny40NzcgMzE5LjUgMTkzVjIzOUMzMTkuNSAyNDQuNTIzIDMxNS4wMjMgMjQ5IDMwOS41IDI0OUgyNjMuNUMyNTcuOTc3IDI0OSAyNTMuNSAyNDQuNTIzIDI1My41IDIzOVYxOTNaIiBmaWxsPSIjRjJDMjAwIi8+CjxyZWN0IHg9Ii00OC41IiB5PSIyNTMiIHdpZHRoPSIxNzAiIGhlaWdodD0iNjYiIHJ4PSIxMCIgZmlsbD0iIzdBM0JGMSIvPgo8cGF0aCBkPSJNMTI1LjUgMjYzQzEyNS41IDI1Ny40NzcgMTI5Ljk3NyAyNTMgMTM1LjUgMjUzSDE4MS41QzE4Ny4wMjMgMjUzIDE5MS41IDI1Ny40NzcgMTkxLjUgMjYzVjMwOUMxOTEuNSAzMTQuNTIzIDE4Ny4wMjMgMzE5IDE4MS41IDMxOUgxMzUuNUMxMjkuOTc3IDMxOSAxMjUuNSAzMTQuNTIzIDEyNS41IDMwOVYyNjNaIiBmaWxsPSIjMDNCRkQzIi8+CjxyZWN0IHg9IjE5NS41IiB5PSIyNTMiIHdpZHRoPSIxMjQiIGhlaWdodD0iNjYiIHJ4PSIxMCIgZmlsbD0iI0ZGNDUwMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEyOV8yMzYiPgo8cmVjdCB3aWR0aD0iMzE5IiBoZWlnaHQ9IjUwNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
const SVG_SRC = `data:image/svg+xml;base64,${SVG_B64}`;

const CW = 319;
const CH = 506;

// 3 editable rows in the white section (y=371-506)
// Row 1 name: y≈404-421, Row 2 position: y≈436-450, Row 3 date: y≈471-483
const FIELDS = [
  {
    key: "name",
    label: "Name",
    placeholder: "Your Name",
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
    placeholder: "Job Title / Co-op",
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
    placeholder: "Date Range",
    x: 16,
    y: 472,
    w: 200,
    h: 13,
    fontSize: 10,
    fontWeight: "400",
    color: "#333",
  },
];

// Typewriter effect: types new characters one by one, deletions are instant
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

const CardField = ({ field, value, isActive, onActivate, scale }) => {
  const shown = useTypewriter(value);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setCursor((c) => !c), 520);
    return () => clearInterval(id);
  }, [isActive]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      style={{
        position: "absolute",
        left: field.x * scale,
        top: field.y * scale,
        width: field.w * scale,
        height: field.h * scale,
        display: "flex",
        alignItems: "center",
        cursor: "text",
        borderBottom: `${scale * 1.2}px solid ${isActive ? "#8B5CF6" : "transparent"}`,
        transition: "border-color 0.2s",
      }}>
      <span
        style={{
          fontSize: field.fontSize * scale,
          fontWeight: field.fontWeight,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          color: value ? field.color : "#bbb",
          whiteSpace: "nowrap",
          overflow: "hidden",
          lineHeight: 1,
          userSelect: "none",
        }}>
        {value ? shown : field.placeholder}
        {isActive && (
          <span
            style={{
              display: "inline-block",
              width: Math.max(1.5, scale * 1.5),
              height: field.fontSize * scale * 0.85,
              background: "#8B5CF6",
              marginLeft: 1,
              verticalAlign: "middle",
              opacity: cursor ? 1 : 0,
            }}
          />
        )}
      </span>
    </div>
  );
};

const PersonalCard = () => {
  const [values, setValues] = useState({ name: "", position: "", date: "" });
  const [activeKey, setActive] = useState(null);
  const [downloading, setDl] = useState(false);
  const [scale, setScale] = useState(1);
  const cardRef = useRef(null);
  const inputRef = useRef(null);

  // Responsive scale
  useEffect(() => {
    const resize = () => {
      const maxW = Math.min(window.innerWidth * 0.9, 480);
      setScale(Math.min(1.5, maxW / CW));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Keyboard input
  useEffect(() => {
    if (!activeKey) return;
    
    // Focus hidden input for mobile keyboard
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const keys = FIELDS.map((f) => f.key);
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

  // Click outside deactivates
  useEffect(() => {
    const out = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target))
        setActive(null);
    };
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

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
        img.src = SVG_SRC;
      });
      FIELDS.forEach((f) => {
        const val = values[f.key];
        if (!val) return;
        ctx.font = `${f.fontWeight} ${f.fontSize}px "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = f.color;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(val, f.x, f.y + f.h / 2, f.w);
      });
      const a = document.createElement("a");
      a.download = "techwin-card.jpg";
      a.href = canvas.toDataURL("image/jpeg", 0.95);
      a.click();
    } finally {
      setDl(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem 1rem 5rem",
        minHeight: "85vh",
        justifyContent: "center",
      }}>
      {/* Hidden input to trigger mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          left: "-100vw",
        }}
        value={activeKey ? values[activeKey] : ""}
        onChange={(e) => {
          if (activeKey) {
            setValues((v) => ({ ...v, [activeKey]: e.target.value }));
          }
        }}
        onBlur={() => {
          // Keep active key if user is just switching fields or clicking around
          // But maybe we want to setActive(null) if they truly blur?
          // For now, let's keep it simple.
        }}
      />
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
          textAlign: "center",
        }}>
        انقر على حقل في البطاقة واكتب — Tab للانتقال
      </p>

      {/* Card */}
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: CW * scale,
          height: CH * scale,
          borderRadius: 16 * scale,
          overflow: "hidden",
          boxShadow:
            "0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07)",
          flexShrink: 0,
          transition: "width 0.3s ease, height 0.3s ease",
        }}>
        <img
          src={SVG_SRC}
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

        {FIELDS.map((f) => (
          <CardField
            key={f.key}
            field={f}
            value={values[f.key]}
            isActive={activeKey === f.key}
            onActivate={() => setActive(f.key)}
            scale={scale}
          />
        ))}

        {/* Active field badge */}
        {activeKey && (
          <div
            style={{
              position: "absolute",
              bottom: 8 * scale,
              right: 8 * scale,
              background: "rgba(139,92,246,0.85)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontSize: Math.max(8, 9 * scale),
              fontWeight: 700,
              padding: `${2 * scale}px ${7 * scale}px`,
              borderRadius: 6 * scale,
              pointerEvents: "none",
            }}>
            {FIELDS.find((f) => f.key === activeKey)?.label}
          </div>
        )}
      </div>

      {/* Download — glass pill matching BottomNav style */}
      <button
        onClick={downloadJPG}
        disabled={downloading}
        style={{
          padding: "0.6rem 2rem",
          borderRadius: "9999px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: downloading
            ? "rgba(255,255,255,0.35)"
            : "rgba(255,255,255,0.85)",
          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
          fontWeight: 600,
          fontFamily: "'Tajawal', sans-serif",
          cursor: downloading ? "not-allowed" : "pointer",
          width: window.innerWidth < 640 ? "85%" : "auto",
          maxWidth: "300px",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06),
            -5px -5px 16px 0px #8B5CF622,
             5px  5px 16px 0px #06B6D422,
            0 6px 24px rgba(0,0,0,0.3)
          `,
          transition: "all 0.25s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!downloading) {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "scale(1.04)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.transform = "scale(1)";
        }}>
        {downloading ? "جاري التحميل..." : "⬇  تحميل JPG"}
      </button>
    </div>
  );
};

export default PersonalCard;
