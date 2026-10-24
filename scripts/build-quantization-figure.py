"""Render the site's figures from a pinned summary, without rerunning models.

Run from the repo root with Python 3.11+ and matplotlib:
    python scripts/build-quantization-figure.py
Source URL and full-summary SHA-256 are stored in the input JSON.
"""

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt


ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "scripts/data/quantization-figure.json").read_text())
COLORS = {"fp16": "#0f62fe", "q8_0": "#008784", "q4_K_M": "#9f1853"}
LABELS = {"fp16": "FP16", "q8_0": "Q8_0", "q4_K_M": "Q4_K_M"}


def render(filename, size, vertical=False):
    fig, axes = plt.subplots(2 if vertical else 1, 1 if vertical else 2, figsize=size)
    fig.subplots_adjust(
        left=0.16 if vertical else 0.09,
        right=0.92 if vertical else 0.97,
        top=0.88 if vertical else 0.84,
        bottom=0.22 if vertical else 0.23,
        hspace=0.85,
        wspace=0.34,
    )
    for ax, task in zip(axes.flat, DATA["tasks"]):
        for point in task["points"]:
            mean, low, high = (point[k] for k in ("mean", "lower", "upper"))
            assert 0 <= low <= mean <= high <= 1
            x = point["tokens_per_second"]
            ax.errorbar(
                x, mean, yerr=[[mean - low], [high - mean]],
                fmt="o", markersize=7, capsize=4,
                color=COLORS[point["arm"]], linewidth=1.4,
            )
            ax.annotate(
                LABELS[point["arm"]], (x, mean), xytext=(7, 7),
                textcoords="offset points", fontsize=10,
            )
        ax.set_title(
            f"{'MMLU' if task['task'] == 'mmlu' else 'Entity extraction'}"
            f" · n={task['n_per_arm']} per arm", fontsize=12, pad=10,
        )
        ax.set_xlabel("Recorded throughput (tokens/sec)", fontsize=10)
        ax.set_ylabel("Accuracy" if task["task"] == "mmlu" else "Micro-F1 (text/type sets)", fontsize=10)
        ax.margins(x=0.22)
        ax.grid(alpha=0.23)
        ax.set_axisbelow(True)
        ax.tick_params(labelsize=9)
    fig.suptitle("Quality and throughput · one local M4 Max run", fontsize=14, y=0.97)
    fig.text(
        0.5, 0.025 if vertical else 0.055,
        "95% score intervals · Llama 3.1 8B Instruct\n"
        "Custom entity-text/type-set scorer; no token-position scoring.\n"
        "Throughput is not deployment cost. Source: committed study summary.",
        ha="center", va="bottom", fontsize=9, color="#4b4b4b",
    )
    fig.savefig(ROOT / "public/work" / filename, dpi=160, facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    render("quantization-pareto.png", (12, 5.5))
    render("quantization-pareto-4x3.png", (8, 6), vertical=True)
