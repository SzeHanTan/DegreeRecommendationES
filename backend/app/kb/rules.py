# TODO: Define all IF-THEN rules after domain expert consultation is complete.
#
# Rule structure:
#   - id          : unique rule identifier (e.g. "CS-01")
#   - description : human-readable explanation shown in the explanation facility
#   - conditions  : dict of { attribute: expected_bool } — ALL must match (AND logic)
#   - degree      : the degree this rule contributes points to
#   - points      : score added when rule fires (10 = weak, 20 = moderate, 30 = strong)
#
# Example:
#   Rule(
#       id="CS-01",
#       description="Strong mathematics skills and enjoys problem solving",
#       conditions={"strong_math": True, "enjoys_problem_solving": True},
#       degree="Computer Science",
#       points=30,
#   )

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Rule:
    id: str
    description: str
    conditions: dict[str, bool]
    degree: str
    points: int


# ─── Rules will be added here after domain expert validation ──────────────────

RULES: list[Rule] = [
    # Placeholder — replace with real rules
]
